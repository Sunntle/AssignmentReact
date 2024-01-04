import { Col, Row } from "reactstrap";
import "./FeatureStyle.scss";
import { animated } from "@react-spring/web";
import useCountInView from "animations/CountAnimation";
function Feature() {
  const [ref, springs] = useCountInView(0);
  return (
    <div className="container pt-5 pb-4" ref={ref}>
      <Row className="pt-5 pb-4">
        <Col xs="12" md="4" >
          <animated.div style={springs} className="support line position-relative">
            <img src="https://flone.jamstacktemplates.dev/assets/img/icon-img/support-1.png" alt="Shipping" />
            <h5 className="my-3 caption">Free Shipping</h5>
            <p className="text-muted">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
          </animated.div>
        </Col>
        <Col xs="12" md="4">
          <animated.div style={springs} className="support line position-relative">
            <img src="https://flone.jamstacktemplates.dev/assets/img/icon-img/support-2.png" alt="Shipping" />
            <h5 className="my-3 caption">Support 24/7</h5>
            <p className="text-muted">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
          </animated.div>
        </Col>
        <Col xs="12" md="4">
          <animated.div style={springs} className="support position-relative">
            <img src="https://flone.jamstacktemplates.dev/assets/img/icon-img/support-3.png" alt="Shipping" />
            <h5 className="my-3 caption">Money Return</h5>
            <p className="text-muted">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
          </animated.div>
        </Col>
      </Row>
    </div>
  );
}

export default Feature;
