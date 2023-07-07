import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Col, Container, Row, Button, Input, FormGroup, Label } from "reactstrap";
import { faMinusCircle, faPlusCircle, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
// import required modules
import { FreeMode, Thumbs } from "swiper/modules";
import "./ShopDetailStyle.scss";
import "../Home/QuickView/QuickViewStyle.scss";
import { faFacebook, faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons";
function ShopDetail() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const params = useParams();
  const [value, setValue] = useState(1);
  const handleIncrement = () => {
    setValue((prevValue) => prevValue + 1);
  };

  const handleDecrement = () => {
    setValue((prevValue) => {
      if (prevValue < 2) return 1;
      return prevValue - 1;
    });
  };

  return (
    <Container className="py-5 wrap-shop-detail">
      <Row className="my-5">
        <Col xs="12" sm="6">
          <Swiper thumbs={{ swiper: thumbsSwiper }} modules={[FreeMode, Thumbs]} className="mySwiper2">
            <SwiperSlide>
              <img
                alt="img"
                className="img-fluid"
                src="https://flone.jamstacktemplates.dev/assets/img/product/fashion/9.jpg"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                alt="img"
                className="img-fluid"
                src="https://flone.jamstacktemplates.dev/assets/img/product/fashion/7.jpg"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                alt="img"
                className="img-fluid"
                src="https://flone.jamstacktemplates.dev/assets/img/product/fashion/5.jpg"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                alt="img"
                className="img-fluid"
                src="https://flone.jamstacktemplates.dev/assets/img/product/fashion/2.jpg"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                alt="img"
                className="img-fluid"
                src="https://flone.jamstacktemplates.dev/assets/img/product/fashion/4.jpg"
              />
            </SwiperSlide>
          </Swiper>
          <Swiper
            onSwiper={(swiper) => {
              if (swiper) return setThumbsSwiper();
              return setThumbsSwiper();
            }}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Thumbs]}
            className="mySwiper"
          >
            <SwiperSlide>
              <img alt="img" src="https://flone.jamstacktemplates.dev/assets/img/product/fashion/9.jpg" />
            </SwiperSlide>
            <SwiperSlide>
              <img alt="img" src="https://flone.jamstacktemplates.dev/assets/img/product/fashion/7.jpg" />
            </SwiperSlide>
            <SwiperSlide>
              <img alt="img" src="https://flone.jamstacktemplates.dev/assets/img/product/fashion/5.jpg" />
            </SwiperSlide>
            <SwiperSlide>
              <img alt="img" src="https://flone.jamstacktemplates.dev/assets/img/product/fashion/2.jpg" />
            </SwiperSlide>
            <SwiperSlide>
              <img alt="img" src="https://flone.jamstacktemplates.dev/assets/img/product/fashion/4.jpg" />
            </SwiperSlide>
          </Swiper>
        </Col>
        <Col xs="12" sm="6" className="text-start">
          <h2>Hat bitToKetCho II</h2>
          <p className="py-3 m-0">22.00 $</p>
          <div className="rating">
            <span>
              <FontAwesomeIcon icon={faStar} />
            </span>
            <span>
              <FontAwesomeIcon icon={faStar} />
            </span>
            <span>
              <FontAwesomeIcon icon={faStar} />
            </span>
            <span>
              <FontAwesomeIcon icon={faStar} />
            </span>
            <span>
              <FontAwesomeIcon icon={faStar} />
            </span>
          </div>
          <div className="description text-muted py-3">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis cupiditate laborum odio? Fugit dolorem
            iste ipsum ipsam obcaecati nihil sint autem sit, numquam et dolores? Odio totam quidem obcaecati corporis.
          </div>
          <FormGroup className="colorContainer">
            <Label for="color">Color </Label>
            <div>
              <Input id="blue" name="color" type="radio" value={"blue"} />
              <Input id="red" name="color" type="radio" value={"red"} />
              <Input id="pink" name="color" type="radio" value={"pink"} />
            </div>
          </FormGroup>
          <FormGroup className="sizeContainer">
            <Label for="size">Size </Label>
            <div>
              <div className="d-inline-flex align-items-center">
                <Input id="s" name="size" type="radio" value={"s"} />
                <span>S</span>
              </div>
              <div className="d-inline-flex align-items-center">
                <Input id="m" name="size" type="radio" value={"m"} />
                <span>M</span>
              </div>
              <div className="d-inline-flex align-items-center">
                <Input id="l" name="size" type="radio" value={"l"} />
                <span>L</span>
              </div>
            </div>
          </FormGroup>
          <div className="quantity d-flex align-items-center">
            <div className="quantityBtn d-flex align-items-center justify-content-center ">
              <FontAwesomeIcon icon={faMinusCircle} onClick={handleDecrement} />
              <Input type="text" value={value} className="border-0 bg-transparent" disabled></Input>
              <FontAwesomeIcon icon={faPlusCircle} onClick={handleIncrement} />
            </div>
            <div className="cartBtn">
              <Button className="btn-dark rounded-0 py-2 px-3">
                <span className="redirectShop">ADD TO CART</span>
              </Button>
            </div>
          </div>
          <div className="wishlist my-3 d-inline-block border-bottom border-dark">
            <Link className="text-dark text-decoration-none">+ Add to wish list</Link>
          </div>
          <div className="social d-flex">
            <FontAwesomeIcon icon={faFacebook} color="blue" className="fs-3" />
            <FontAwesomeIcon icon={faTwitter} color="blue" className="fs-3" />
            <FontAwesomeIcon icon={faLinkedin} className="fs-3" />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ShopDetail;
