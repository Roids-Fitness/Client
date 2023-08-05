import React from "react";
import { Card, CardGroup } from "react-bootstrap";

/** The footer component that is displayed at the bottom of every page. Contains information about the gym, including opening hours, contact details and location.
 * 
 * @returns footer component
 */
function Footer() {
  return (
    <div className="footer-container">
      <div className="centred-container">
        <CardGroup className="footer">
          <Card>
            <Card.Title className="title">Opening Hours</Card.Title>
            <Card.Text>
              Monday - Saturday: 9:00am - 7:00pm <br />
              Sunday : 10:00am - 4:00pm
            </Card.Text>
          </Card>
          <Card>
            <Card.Title className="title">Contact Us</Card.Title>
            <Card.Text>
              Phone: (07) 3345 2353 <br />
              Email : enquires@roidsfitness.com
            </Card.Text>
          </Card>
          <Card>
            <Card.Title className="title">Location</Card.Title>
            <Card.Text>276 McCullough Tc, Sunnybank QLD 4109</Card.Text>
          </Card>
        </CardGroup>
      </div>
      <div className="centred-container">
        <CardGroup className="footer">
          <Card>
            <Card.Text id="copyright-text">
              Copyright © 2023 Roids Fitness Pty Ltd | ABN: 59 123 932 200
            </Card.Text>
          </Card>
        </CardGroup>
      </div>
    </div>
  );
}

export default Footer;
