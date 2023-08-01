import React, {useState} from "react";
import "./components.css";
import { DayPilotCalendar } from "@daypilot/daypilot-lite-react";

function ClassTimetable() {

  // eslint-disable-next-line
  const [config, setConfig] = useState({
    viewType: "Week"
  });

  return (
    <div className="calendar-container">
      <DayPilotCalendar {...config} />
    </div>
  );
}

export default ClassTimetable;

  // const classSchedule = [
  //   {
  //     id: 1,
  //     title: 'Pilates',
  //     start: new Date(2023, 6, 16, 14, 0),
  //     end: new Date(2023, 6, 16, 15, 0),
  //     trainer: 'Priya Charasu',
  //     description: 'Pilates is a low-impact workout that focuses on improving flexibility, strength, and overall body awareness...',
  //   },
  //   {
  //     id: 2,
  //     title: 'Yoga',
  //     start: new Date(2023, 6, 17, 10, 30),
  //     end: new Date(2023, 6, 17, 12, 0),
  //     trainer: 'Samantha Johnson',
  //     description: 'Yoga is a practice that combines physical postures, breathing exercises, and meditation...',
  //   },
  // ];