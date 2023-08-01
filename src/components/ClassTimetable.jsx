import React, { useEffect, useRef, useState } from "react";
import "./components.css";
import {
  DayPilotCalendar,
  DayPilotNavigator,
} from "@daypilot/daypilot-lite-react";
import { Link } from "react-router-dom";

function ClassTimetable() {
  const calendarRef = useRef();
  // eslint-disable-next-line
  const [calendarConfig, setCalendarConfig] = useState({
    viewType: "Week",
    durationBarVisible: false,
    onEventClick: async (args) => {
      const eventId = args.e.id();

      const url = `/class/${eventId}`;

      window.location.href = url;
    },
  });

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

    var startDate = new Date(Date.now());

    calendarRef.current.control.update({ startDate, events });
  }, []);

  return (
    <div className="calendar-container">
      <div>
        <DayPilotNavigator
          selectMode={"Week"}
          showMonths={1}
          skipMonths={1}
          startDate={"2023-10-02"}
          selectionDay={"2023-10-02"}
          onTimeRangeSelected={(args) => {
            calendarRef.current.control.update({
              startDate: args.day,
            });
          }}
        />
      </div>
      <div>
        <Link to="/class/:id">
        <DayPilotCalendar {...calendarConfig} ref={calendarRef} /></Link>
      </div>
    </div>
  );
}

export default ClassTimetable;
