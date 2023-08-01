import React, { useEffect, useRef, useState } from "react";
import "./components.css";
import {
  DayPilotCalendar,
  DayPilotNavigator,
} from "@daypilot/daypilot-lite-react";
import { Helmet } from "react-helmet";

function ClassTimetable() {
  const calendarRef = useRef();

  // eslint-disable-next-line
  const [calendarConfig, setCalendarConfig] = useState({
    viewType: "Week",
    businessBeginsHour: 7,
    businessEndsHour: 22,
    headerDateFormat: "dddd d/MM",
    durationBarVisible: false,
    onEventClick: (args) => {
      const eventId = args.e.id();
      const url = `/class/${eventId}`;
      window.location.href = url;
    },
  });

  // eslint-disable-next-line
  const [startDate, setStartDate] = useState(new Date(Date.now()));

  useEffect(() => {
    const events = [
      {
        id: 1,
        text: "Yoga",
        start: "2023-08-02T12:00:00",
        end: "2023-08-02T13:00:00",
      },
      {
        id: 2,
        text: "Pilates",
        start: "2023-08-02T13:00:00",
        end: "2023-08-02T14:00:00",
      },
      {
        id: 3,
        text: "Boxing",
        start: "2023-08-05T09:00:00",
        end: "2023-08-05T10:00:00",
      },
      {
        id: 4,
        text: "Hit Fit",
        start: "2023-08-04T13:00:00",
        end: "2023-08-04T14:00:00",
      },
      {
        id: 5,
        text: "Strength Training",
        start: "2023-08-01T13:00:00",
        end: "2023-08-01T14:00:00",
      },
    ];

    calendarRef.current.control.update({ startDate, events });
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
