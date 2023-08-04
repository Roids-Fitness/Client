import React from "react";
import { Helmet } from "react-helmet";
import { Image, Button } from "react-bootstrap";
import image1 from "../resources/images/class-details-image1.jpeg";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ClassDetails() {
  const navigate = useNavigate();

  const events = [
    {
      id: 1,
      title: "Yoga",
      description: "Yoga class for beginners",
      trainer: "John Doe",
      start: "2023-08-02T12:00:00",
      end: "2023-08-02T13:00:00",
    },
    {
      id: 2,
      title: "Pilates",
      description: "Pilates workout for core strength",
      trainer: "Jane Smith",
      start: "2023-08-02T13:00:00",
      end: "2023-08-02T14:00:00",
    },
    {
      id: 3,
      title: "Boxing",
      description: "Boxing training for all levels",
      trainer: "Mike Johnson",
      start: "2023-08-05T09:00:00",
      end: "2023-08-05T10:00:00",
    },
    {
      id: 4,
      title: "Hit Fit",
      description: "High-Intensity Training (HIT) session",
      trainer: "Sarah Williams",
      start: "2023-08-04T13:00:00",
      end: "2023-08-04T14:00:00",
    },
    {
      id: 5,
      title: "Strength Training",
      description: "Strength training with weights",
      trainer: "Alex Davis",
      start: "2023-08-01T13:00:00",
      end: "2023-08-01T14:00:00",
    },
  ];

  const handleSignUp = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log(token);
      if (token) {
        const response = await axios.put(
          "http://localhost:3001/class/64cb336b5c5b696653674a09", //change to id of class
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        alert("Signup successful!" + response.data);
        navigate("/class");
      } else {
        alert("Please login to signup!");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error signing up:", error);
      // Handle the error if needed
    }
  };
  const { id } = useParams();
  const event = events.find((event) => event.id === parseInt(id));

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

  const startTime = new Date(event.start);
  const endTime = new Date(event.end);

  const formattedDate = formatDate(startTime);
  const formattedTimeRange = `${formatTime(startTime)} - ${formatTime(
    endTime
  )}`;

  return (
    <>
      <Helmet>
        <title>{event.title} - Roids Fitness Gym</title>
      </Helmet>
      <div className="image-container">
        <Image src={image1} alt="gym trainer" className="custom-image" />
      </div>
      <div className="word-container">
        <h1 className="title">{event.title}</h1>
        <p>{event.description}</p>
        <h1 className="title">Details</h1>
        <p>
          Time: {formattedDate}, {formattedTimeRange}
        </p>
        <p>Trainer: {event.trainer}</p>
        <div className="d-flex justify-content-center">
          <Button className="button" type="submit" onClick={handleSignUp}>
            Sign up
          </Button>
        </div>
      </div>
    </>
  );
}

export default ClassDetails;
