import React from "react";
import Carousel from "react-bootstrap/Carousel";
import CarouselContent from "../components/CarouselContent";
import image1 from "../resources/images/home-image1.jpeg";
import image2 from "../resources/images/home-image2.jpeg";
import image3 from "../resources/images/home-image3.jpeg";
import { Helmet } from "react-helmet";

/**
 * This is the home page for the website, it displays a carousel with images and promotional text.
 * @returns Home component
 */
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
