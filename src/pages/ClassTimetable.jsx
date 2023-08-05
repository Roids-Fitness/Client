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

  const handleEventClick = (args) => {
    navigate(`/class/${args.e.id()}`);
  };

  useEffect(() => {
    const getClasses = async () => {
      try {
        const apiURL = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiURL}/class`);
        const events = convertClassData(response.data);
        setClassesData(events);
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
    }
  }, [classesData]);

  return (
    <>
      <Helmet>
        <title>Join a class - Roids Fitness Gym</title>
      </Helmet>
      <div className="word-container">
        <h1 className="title">Class Timetable</h1>
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

// const colouredEvents = events.map((event) => ({
//   ...event,
//   backColor: event.participantList.find((id) => id === localStorage.getItem("user").id) ? "#FE3434" : "#E8EAED",
// }));
