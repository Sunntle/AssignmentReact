import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Images from "assets/images/logo.png";
import ImagesPayment from "assets/images/payment.png";
import { Link } from "react-router-dom";
import { Button, Col, Container, Form, FormGroup, Input, List, Row } from "reactstrap";
import "./styles.scss";
function Footer() {
  return (
    <footer className="mt-5 py-5 bg-black text-start">
      <Container className="text-white">
        <Row>
          <Col lg="4" md="6" xs="6">
            <div className="foot__about">
              <div className="foot__logo">
                <img src={Images} alt="logo" />
              </div>
              <p>
                The customer is at the heart of
                <br />
                our unique business model, which includes design.
              </p>
              <Link href="#">
                <img className="img-fluid" src={ImagesPayment} alt="" />
              </Link>
            </div>
          </Col>
          <Col lg="2" md="6" xs="6">
            <div className="foot__widget">
              <h4>CATEGORIES</h4>
              <List type="unstyled">
                <li className="py-1">
                  <Link href="#" className="text-white text-decoration-none">
                    Clothing Store
                  </Link>
                </li>
                <li className="py-1">
                  <Link href="#" className="text-white text-decoration-none">
                    Trending Shoes
                  </Link>
                </li>
                <li className="py-1">
                  <Link href="#" className="text-white text-decoration-none">
                    Sale
                  </Link>
                </li>
                <li className="py-1">
                  <Link href="#" className="text-white text-decoration-none">
                    News
                  </Link>
                </li>
              </List>
            </div>
          </Col>
          <Col lg="2" md="6" xs="6">
            <div className="foot__widget">
              <h4>FAQs</h4>
              <List type="unstyled">
                <li className="py-1">
                  <Link href="#" className="text-white text-decoration-none">
                    Contact Us
                  </Link>
                </li>
                <li className="py-1">
                  <Link href="#" className="text-white text-decoration-none">
                    Payment
                  </Link>
                </li>
                <li className="py-1">
                  <Link href="#" className="text-white text-decoration-none">
                    Delivary
                  </Link>
                </li>
                <li className="py-1">
                  <Link href="#" className="text-white text-decoration-none">
                    Return & Exchange
                  </Link>
                </li>
              </List>
            </div>
          </Col>
          <Col lg="4" md="6" xs="6">
            <div className="foot__widget">
              <h4>NEW LETTER</h4>
              <div className="py-1">
                <p>Be the first to know about new arrivals, look books, sales & promos!</p>
                <Form action="#" className="d-flex ">
                  <FormGroup>
                    <Input
                      className="bg-transparent rounded-0 border-0 border-bottom px-2 text-white"
                      type="text"
                      placeholder="Your Email"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Button className="bg-transparent text-white border-0" type="submit">
                      <span>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </span>
                    </Button>
                  </FormGroup>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
