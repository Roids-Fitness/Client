import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  DayPilotCalendar,
  DayPilotNavigator,
} from "@daypilot/daypilot-lite-react";
import { Helmet } from "react-helmet";
import { fetchClasses, convertClassData } from "../services/ClassServices";

function ClassTimetable() {
  const calendarRef = useRef();
  const navigate = useNavigate();  

  const handleEventClick = (args) => {
    navigate(`/class/${args.e.id()}`);
  };

  // eslint-disable-next-line
  const [calendarConfig, setCalendarConfig] = useState({
    viewType: "Week",
    businessBeginsHour: 7,
    businessEndsHour: 22,
    headerDateFormat: "dddd d/MM",
    durationBarVisible: false,
    onEventClick: handleEventClick,
  });

  // eslint-disable-next-line
  const [startDate, setStartDate] = useState(new Date(Date.now()));

  useEffect(() => {
    const apiURL = process.env.REACT_APP_API_URL;
    try {
      fetchClasses(apiURL).then((data) => {
        const events = convertClassData(data);
        calendarRef.current.control.update({ startDate, events });
      });
    } catch (error) {
      console.log(error);
    }
  }, [startDate]);

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
          <DayPilotCalendar {...calendarConfig} ref={calendarRef} />
        </div>
        <div>
          <DayPilotNavigator
            selectMode={"Week"}
            showMonths={1}
            skipMonths={1}
            startDate={startDate}
            selectionDay={startDate}
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


