import React, { useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-cards";
import "./BlogStyle.scss";
function Blog() {
  const handleShowContent = (index) => {
    const content = document.querySelectorAll(".contentBlog");
    content.forEach((data) => data.classList.remove("show"));
    const contentId = document.querySelector(`.contentBlog:nth-child(${index + 1})`);
    contentId.classList.add("show");
  };
  useEffect(() => {
    handleShowContent(0);
  });
  return (
    <Container>
      <Row className="align-items-center justify-content-center">
        <Col xs="12" md="6" lg="4" className="p-5">
          <Swiper
            effect={"cards"}
            grabCursor={true}
            modules={[EffectCards]}
            className="mySwiper"
            onSlideChange={(slide) => handleShowContent(slide.activeIndex)}
          >
            <SwiperSlide>
              <img
                src="https://flone.jamstacktemplates.dev/assets/img/blog/blog-1.jpg"
                alt="blog"
                className="img-fluid"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://flone.jamstacktemplates.dev/assets/img/blog/blog-2.jpg"
                alt="blog"
                className="img-fluid"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://flone.jamstacktemplates.dev/assets/img/blog/blog-3.jpg"
                alt="blog"
                className="img-fluid"
              />
            </SwiperSlide>
          </Swiper>
        </Col>
        <Col xs="12" md="6" lg="8" className="px-4">
          <div className="contentBlog">
            <h3 className="my-3 title text-capitalize">A guide to latest trends</h3>
            <p className="text-muted my-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit ad tempore voluptatem voluptates,
              repudiandae modi. Numquam maxime exercitationem, nisi maiores laboriosam nostrum dolorum similique
              repudiandae! Ut doloremque fugit explicabo cum?
            </p>
            <h4 className="fw-light fst-italic">By Chris.Hamton</h4>
          </div>
          <div className="contentBlog">
            <h3 className="my-3 title text-capitalize">Five ways to lead a happy life</h3>
            <p className="text-muted ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit ad tempore voluptatem voluptates,
              repudiandae modi. Numquam maxime exercitationem, nisi maiores laboriosam nostrum dolorum similique
              repudiandae! Ut doloremque fugit explicabo cum?
            </p>
            <h4 className="fw-light fst-italic">By Tai Le Cong Thanh</h4>
          </div>
          <div className="contentBlog">
            <h3 className="my-3 title text-capitalize">Tips on having a happy life</h3>
            <p className="text-muted ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit ad tempore voluptatem voluptates,
              repudiandae modi. Numquam maxime exercitationem, nisi maiores laboriosam nostrum dolorum similique
              repudiandae! Ut doloremque fugit explicabo cum?
            </p>
            <h4 className="fw-light fst-italic">By Elizabeth Cristonsel</h4>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Blog;
