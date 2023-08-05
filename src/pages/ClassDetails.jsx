import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Image, Button } from "react-bootstrap";
import image1 from "../resources/images/class-details-image1.jpeg";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function ClassDetails() {
  const [classData, setClassData] = useState(null);
  const navigate = useNavigate();
  const apiURL = process.env.REACT_APP_API_URL;
  const { id } = useParams();

  useEffect(() => {
    // Function to fetch class data for the specified id
    const getClassDetails = async (id) => {
      try {
        const apiURL = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiURL}/class/${id}`);
        setClassData(response.data);
      } catch (error) {
        console.error(error);
        setClassData(null);
      }
    };

    if (id) {
      getClassDetails(id);
    } else {
      console.error("Class ID not provided in the URL.");
    }
  }, [id]);

  const handleSignUp = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log(token);
      if (token) {
        const response = await axios.put(
          `${apiURL}/class/${id}`,
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
        navigate("/user/login");
      }
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  // Function to format date in "Thursday, August 3" format
  const formatDate = (dateString) => {
    const options = { weekday: "long", month: "long", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  // Function to format time in "12:00PM" format
  const formatTime = (timeString) => {
    const options = { hour: "numeric", minute: "numeric", timeZone: "UTC" };
    const time = new Date(timeString);
    return time.toLocaleTimeString(undefined, options);
  };

  // Function to format date and time range
  const formatDateTimeRange = (startTime, endTime) => {
    const formattedStart = `${formatDate(startTime)}, ${formatTime(startTime)}`;
    const formattedEnd = `${formatTime(endTime)}`;
    return `${formattedStart} - ${formattedEnd}`;
  };

  const isClassStartTimePassed = (startTime) => {
    const currentTime = new Date();
    const classStartTime = new Date(startTime);
    classStartTime.setHours(classStartTime.getHours() - 10)
    return currentTime > classStartTime;
  };

  return (
    <>
      <Helmet>
        <title>
          {classData
            ? `${classData.title} - Roids Fitness Gym`
            : "Class Details"}
        </title>
      </Helmet>
      <div className="image-container">
        <Image src={image1} alt="gym trainer" className="custom-image" />
      </div>
      {classData ? (
        <div className="word-container">
          <h1 className="title">{classData.title}</h1>
          <p>{classData.description}</p>
          <h1 className="title">Details</h1>
          <p>
            Time: {formatDateTimeRange(classData.startTime, classData.endTime)}
          </p>
          <p>Trainer: {classData.trainer}</p>
          <div className="d-flex justify-content-center">
          {!isClassStartTimePassed(classData.startTime) && (
              <Button className="button" type="submit" onClick={handleSignUp}>
                Sign up
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}

export default ClassDetails;
