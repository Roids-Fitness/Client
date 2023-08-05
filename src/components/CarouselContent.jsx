import React from 'react';

/** This is a component that will be used in the Carousel component in Home.jsx as it is repeated thrice.
 * 
 * @returns CarouselContent component
 */
const CarouselContent = () => {
  return (
    <>
      <div className="big-text white-text">START YOUR FITNESS JOURNEY AT</div>
      <div className="big-text red-text">ROIDS FITNESS</div>
      <div>
        <span className="white-text">Inquire now for a </span>
        <span className="red-text">30-Day Free </span>
        <span className="white-text">Membership Trial</span>
      </div>
    </>
  );
};

export default CarouselContent;