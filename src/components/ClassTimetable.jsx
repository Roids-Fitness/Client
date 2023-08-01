import React from "react";
import "./components.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

function ClassTimetable() {

  const localizer = momentLocalizer(moment);

  const classSchedule = [
    {
      id: 1,
      title: 'Pilates',
      start: new Date(2023, 6, 16, 14, 0), // Start date and time for the class
      end: new Date(2023, 6, 16, 15, 0),   // End date and time for the class (1 hour after start time)
      trainer: 'Priya Charasu',
      description: 'Pilates is a low-impact workout that focuses on improving flexibility, strength, and overall body awareness...',
    },
    {
      id: 2,
      title: 'Yoga',
      start: new Date(2023, 6, 17, 10, 30),
      end: new Date(2023, 6, 17, 12, 0),
      trainer: 'Samantha Johnson',
      description: 'Yoga is a practice that combines physical postures, breathing exercises, and meditation...',
    },
    // Add more events as needed
  ];

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={classSchedule}
        views={['week']} // Show only weekly view
        startAccessor="start" // Property name for the start date of the event
        endAccessor="end" // Property name for the end date of the event
        titleAccessor="title" // Property name for the title of the event
        onSelectEvent={(event) => {
          // Handle event selection (e.g., open a details page)
          console.log(event);
        }}
        style={{ height: 600 }} // Set the height of the calendar component
      />
    </div>
  );
}

export default ClassTimetable;
