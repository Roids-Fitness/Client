import React from "react";
import "./components.css";
import Carousel from "react-bootstrap/Carousel";
import CarouselContent from "./CarouselContent";
import image1 from "../resources/home-image1.jpeg";
import image2 from "../resources/home-image2.jpeg";
import image3 from "../resources/home-image3.jpeg";
import { Helmet } from "react-helmet";

function Home() {
  return (
    <>
      <Helmet>
        <title>Home - Roids Fitness Gym</title>
      </Helmet>
      <Carousel fade>
        <Carousel.Item>
          <img
            className="d-block w-100 home-images"
            src={image1}
            alt="Rope row"
          />
          <Carousel.Caption>
            <CarouselContent />
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 home-images"
            src={image2}
            alt="Weight Bar"
          />
          <Carousel.Caption>
            <CarouselContent />
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100 home-images" src={image3} alt="Yoga" />
          <Carousel.Caption>
            <CarouselContent />
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  );
}

export default Home;
