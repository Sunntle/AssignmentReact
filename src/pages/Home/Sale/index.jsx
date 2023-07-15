import * as moment from "moment";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import "./SaleStyle.scss";
function Sale() {
  const [countdown, setCountdown] = useState(null);
  useEffect(() => {
    const endTime = moment("2023-08-26 00:00:00", "YYYY-MM-DD HH:mm:ss"); // Ensure the format matches
    const interval = setInterval(() => {
      const now = moment();
      const remainingTime = endTime.diff(now);
      setCountdown(moment.duration(remainingTime));
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="wrap">
      <Container fluid="lg" className="py-5">
        <Row className="align-items-center justify-content-center">
          <Col xs="12" md="4" lg="6" className="order-2 order-lg-1">
            <img
              src="https://flone.jamstacktemplates.dev/assets/img/banner/deal-2.png"
              alt="Sale Item"
              className="img-fluid"
            />
          </Col>
          <Col xs="12" md="8" lg="6" className="order-1 order-lg-2">
            <h2>Deal of the day</h2>
            <div className="timer text-center">
              <span className="cdown">
                {countdown && countdown.asDays().toFixed(0)}
                <p>days</p>
              </span>
              <span className="cdown">
                {countdown && countdown.hours()}
                <p>hours</p>
              </span>
              <span className="cdown">
                {countdown && countdown.minutes()}
                <p>minutes</p>
              </span>
              <span className="cdown">
                {countdown && countdown.seconds()}
                <p>secs</p>
              </span>
            </div>
            <Link to="/shop" className="btn btn-dark py-2 px-3">
              <span className="redirectShop">SHOP NOW</span>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Sale;
