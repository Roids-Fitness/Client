import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "./components.css";
import image1 from "../resources/home-image1.jpeg";
import image2 from "../resources/home-image2.jpeg";
import image3 from "../resources/home-image3.jpeg";

function Home() {
  return (
    <Carousel fade>
      <Carousel.Item>
        <img
          className="d-block w-100 home-images"
          src={image1}
          alt="Rope row"
        />
        <Carousel.Caption>
          <div className="big-white-text">START YOUR FITNESS JOURNEY AT </div>
          <div className="big-red-text">ROIDS FITNESS</div>
          <div>
            <span className="white-text">Inquire now for a </span>
            <span className="red-text">30-Day Free </span>
            <span className="white-text">Membership Trial</span>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 home-images"
          src={image2}
          alt="Treadmill"
        />
        <Carousel.Caption>
          <div className="big-white-text">START YOUR FITNESS JOURNEY AT </div>
          <div className="big-red-text">ROIDS FITNESS</div>
          <div>
            <span className="white-text">Inquire now for a </span>
            <span className="red-text">30-Day Free </span>
            <span className="white-text">Membership Trial</span>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100 home-images" src={image3} alt="Yoga" />
        <Carousel.Caption>
          <div className="big-white-text">START YOUR FITNESS JOURNEY AT </div>
          <div className="big-red-text">ROIDS FITNESS</div>
          <div>
            <span className="white-text">Inquire now for a </span>
            <span className="red-text">30-Day Free </span>
            <span className="white-text">Membership Trial</span>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Home;
