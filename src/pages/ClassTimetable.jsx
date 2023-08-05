import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  DayPilotCalendar,
  DayPilotNavigator,
} from "@daypilot/daypilot-lite-react";
import { Helmet } from "react-helmet";
import { convertClassData } from "../services/ClassServices";
import axios from "axios";

function ClassTimetable() {
  const calendarRef = useRef();
  const [classesData, setClassesData] = useState(null);
  const navigate = useNavigate();
  const [viewType, setViewType] = useState("Week");
  const [numberOfClass, setNumberOfClass] = useState(0);

  useEffect(() => {
    const getClasses = async () => {
      try {
        const apiURL = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiURL}/class`);
        const events = convertClassData(response.data);
        const userLocalStorageData = localStorage.getItem("user");
        const userId = userLocalStorageData
          ? JSON.parse(userLocalStorageData).id
          : null;
        const colouredEvents = events.map((event) => ({
          ...event,
          backColor: event.participantList.includes(userId)
            ? "#FE3434"
            : "#E8EAED",
        }));
        setClassesData(colouredEvents);
      } catch (error) {
        console.error(error);
        setClassesData(null);
      }
    };
    

    getClasses();
  }, []);

  useEffect(() => {
    const handleWindowResize = () => {
      if (window.innerWidth <= 768) {
        setViewType("Day");
      } else {
        setViewType("Week");
      }
    };

    handleWindowResize(); // Initial check

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  useEffect(() => {
    if (classesData && calendarRef.current) {
      calendarRef.current.control.update({ events: classesData });

      // Calculate the number of classes in the current week (Sunday to Saturday)
      const today = new Date();
      const startOfWeek = new Date(today);
      startOfWeek.setDate(startOfWeek.getDate() - today.getDay()); // Set to Sunday of this week
      const endOfWeek = new Date(today);
      endOfWeek.setDate(endOfWeek.getDate() + (6 - today.getDay())); // Set to Saturday of this week

      const classesThisWeek = classesData.filter(
        (event) =>
          event.backColor === "#FE3434" &&
          new Date(event.start) >= startOfWeek &&
          new Date(event.start) <= endOfWeek
      );
      setNumberOfClass(classesThisWeek.length);
    }
  }, [classesData]);

  const handleEventClick = (args) => {
    navigate(`/class/${args.e.id()}`);
  };

  return (
    <>
      <Helmet>
        <title>Join a class - Roids Fitness Gym</title>
      </Helmet>
      <div className="word-container">
        <h1 className="title">Class Timetable</h1>
        {localStorage.getItem("user") && localStorage.getItem("token") && (
          <p>You have {numberOfClass} class(es) this week (shown in red).</p>
        )}
        <p>Select on the class the class you are interested in to sign up!</p>
      </div>
      <div className="calendar-container">
        <div>
          <DayPilotCalendar
            viewType={viewType}
            businessBeginsHour={7}
            businessEndsHour={22}
            headerDateFormat="dddd d/MM"
            durationBarVisible={false}
            onEventClick={handleEventClick}
            ref={calendarRef}
          />
        </div>
        <div>
          <DayPilotNavigator
            selectMode={"Week"}
            showMonths={1}
            skipMonths={1}
            startDate={new Date(Date.now())}
            selectionDay={new Date(Date.now())}
            onTimeRangeSelected={(args) => {
              calendarRef.current.control.update({
                startDate: args.day,
              });
            }}
          />
        </div>
      </div>
      <div className="word-container">
        <h1 className="title">What to bring to class</h1>
        <ul>
          <li>Water bottle</li>
          <li>Towel</li>
          <li>Comfortable clothing</li>
        </ul>
      </div>
    </>
  );
}

export default ClassTimetable;
