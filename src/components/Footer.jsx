import React from "react";
import { Card, CardGroup } from "react-bootstrap";
import "./components.css";

function Footer() {
  return (
    <div className="footer-container">
      <div className="card-group-container">
        <CardGroup className="footer">
          <Card>
              <Card.Title>Opening Hours</Card.Title>
              <Card.Text>
                Monday - Saturday: 9:00am - 7:00pm <br />
                Sunday : 10:00am - 4:00pm
              </Card.Text>
          </Card>
          <Card>
              <Card.Title>Contact Us</Card.Title>
              <Card.Text>
                Phone: (07) 3345 2353 <br />
                Email : enquires@roidsfitness.com
              </Card.Text>
          </Card>
          <Card>
              <Card.Title>Location</Card.Title>
              <Card.Text>276 McCullough Tc, Sunnybank QLD 4109</Card.Text>
          </Card>
        </CardGroup>
      </div>
      <CardGroup className="footer">
      <Card>
          <Card.Text>
            Copyright © 2023 Roids Fitness Pty Ltd | ABN: 59 123 932 200
          </Card.Text>
      </Card></CardGroup>
    </div>
  );
}

export default Footer;
