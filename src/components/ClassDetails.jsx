import React from "react";
import "./components.css";
import { Image, Button } from "react-bootstrap";
import image1 from "../resources/class-details-image1.jpeg";

function ClassDetails() {
  const exampleClass = {
    id: 1,
    title: "Pilates",
    date: new Date(2023, 6, 16).setHours(14, 0, 0, 0),
    description:
      "Pilates is a low-impact workout that focuses on improving flexibility, strength, and overall body awareness. The main emphasis in Pilates is on core strength, proper alignment, and controlled movements. It is often done on a mat or with specialized equipment, such as a reformer, which provides resistance to enhance the exercises.",
    trainer: "Priya Charasu",
  };

  const formatDate = (date) => {
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const formatTime = (date) => {
    const options = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return date.toLocaleTimeString("en-US", options);
  };

  const startTime = new Date(exampleClass.date);
  const endTime = new Date(exampleClass.date);
  endTime.setHours(endTime.getHours() + 1);

  const formattedDate = formatDate(startTime);
  const formattedTimeRange = `${formatTime(startTime)} - ${formatTime(
    endTime
  )}`;

  return (
    <>
      <div className="image-container">
        <Image src={image1} alt="gym trainer" className="custom-image" />
      </div>
      <div className="word-container">
        <h1 className="title">{exampleClass.title}</h1>
        <p>{exampleClass.description}</p>
        <h1 className="title">Details</h1>
        <p>
          Time: {formattedDate}, {formattedTimeRange}
        </p>
        <p>Trainer: {exampleClass.trainer}</p>
        <div className="d-flex justify-content-center">
          <Button className="button" type="submit">
            Sign up
          </Button>
        </div>
      </div>
    </>
  );
}

export default ClassDetails;
