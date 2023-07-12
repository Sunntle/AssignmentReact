import React from "react";
import { Button, Col, Container, Row } from "reactstrap";
import "./CheckoutStyle.scss";
function Checkout() {
  return (
    <Container className="my-5 py-5">
      <Row>
        <Col xs="12" lg="7">
          <h3>Billing Details</h3>
        </Col>
        <Col xs="12" lg="5">
          <h3>Your order</h3>
          <div className="wrap-your-order p-4 shadown-sm rounded my-3">
            <div className="d-flex justify-content-between border-bottom py-3">
              <h4>Product</h4>
              <h4>Total</h4>
            </div>
            <div className="d-flex justify-content-between border-bottom py-4">
              <p className="m-0">Product name here</p>
              <p className="m-0">12.29$</p>
            </div>
            <div className="d-flex justify-content-between border-bottom py-4">
              <h6>Shipping</h6>
              <h6>Free shipping</h6>
            </div>
            <div className="d-flex justify-content-between py-3">
              <h4>Total</h4>
              <h4 className="your-order__price">12.29$</h4>
            </div>
          </div>
          <Button className="w-100 text-uppercase my-3 py-2 px-auto text-white btn-confirm rounded-5">
            place order
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Checkout;
