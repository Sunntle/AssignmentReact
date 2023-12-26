import React from "react";
import { Col, Container, Row } from "reactstrap";
import "./AboutStyle.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase, faLightbulb, faSmile, faTrophy } from "@fortawesome/free-solid-svg-icons";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { useSpring, animated, useSprings } from "@react-spring/web";
const items = [
  {
    title: "Our Vision",
    description:
      "Clothing26 provide how all this mistaken idea of denounc pleasure and sing pain was born an will give you a ete account of the system, and expound the actual teangs the eat explorer of the truth.",
    delay: 0,
  },
  {
    title: "Our Mission",
    description:
      "Clothing26 provide how all this mistaken idea of denounc pleasure and sing pain was born an will give you a ete account of the system, and expound the actual teangs the eat explorer of the truth.",
    delay: 130,
  },
  {
    title: "Our Goal",
    description:
      "Clothing26 provide how all this mistaken idea of denounc pleasure and sing pain was born an will give you a ete account of the system, and expound the actual teangs the eat explorer of the truth.",
    delay: 180,
  },
];
function AboutPage() {
  const useCountAnimation = (targetValue) => {
    const props = useSpring({
      from: { count: 0 },
      to: { count: targetValue },
      config: { duration: 1000 },
    });

    return props.count.interpolate((value) => Math.floor(value));
  };
  const springs = useSprings(
    items.length,
    items.map((item) => ({
      from: { opacity: 0 },
      to: { opacity: 1 },
      config: { duration: 400 },
      delay: item.delay,
    }))
  );
  const fade = useSpring({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
    config: { duration: 500 },
  });
  return (
    <div className="about-wrap">
      <Container className="welcome-content mt-3 mb-4 pb-4">
        <animated.div style={fade} className="pb-5">
          <h5 className="text-muted m-0">Who we are</h5>
          <h2 className="title position-relative py-3">Welcome To Clothing26</h2>
          <p className="w-50 mx-auto my-4 text-muted">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi harum necessitatibus pariatur non quasi a
            dolor quis repudiandae temporibus vero veniam quaerat dolorem odit porro, et ullam molestiae earum
            voluptates.
          </p>
        </animated.div>
        <Row className="text-start ">
          {springs.map((el, index) => {
            return (
              <Col md="4" lg="4" key={index}>
                <animated.div style={el} className="mb-3">
                  <h3>{items[index].title}</h3>
                  <p className="text-muted my-3">{items[index].description}</p>
                </animated.div>
              </Col>
            );
          })}
        </Row>
      </Container>
      <div className="pt-5 pb-4 funfact-content">
        <Container className="py-5">
          <Row>
            <Col sm="6" md="6" lg="3">
              <div>
                <FontAwesomeIcon size="2xl" icon={faBriefcase} />
              </div>
              <animated.h2 className="count my-3">{useCountAnimation(360)}</animated.h2>
              <p className="fs-5">Project Done</p>
            </Col>
            <Col sm="6" md="6" lg="3">
              <div>
                <FontAwesomeIcon size="2xl" icon={faTrophy} />
              </div>
              <animated.h2 className="count my-3">{useCountAnimation(1000)}</animated.h2>
              <p className="fs-5">User Register</p>
            </Col>
            <Col sm="6" md="6" lg="3">
              <div>
                <FontAwesomeIcon size="2xl" icon={faLightbulb} />
              </div>
              <animated.h2 className="count my-3">{useCountAnimation(200)}</animated.h2>
              <p className="fs-5">Project Done</p>
            </Col>
            <Col sm="6" md="6" lg="3">
              <div>
                <FontAwesomeIcon size="2xl" icon={faSmile} />
              </div>
              <animated.h2 className="count my-3">{useCountAnimation(360)}</animated.h2>
              <p className="fs-5">Project Done</p>
            </Col>
          </Row>
        </Container>
      </div>
      <Container className=" pt-5 pb-4">
        <Swiper
          id="logoBrand"
          autoplay={{
            delay: 1000,
            disableOnInteraction: false,
          }}
          slidesPerView={2}
          spaceBetween={10}
          modules={[Autoplay]}
          breakpoints={{
            640: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 6,
              spaceBetween: 50,
            },
          }}
          loop
          className="mySwiper py-5"
        >
          <SwiperSlide>
            <img
              className="img-fluid"
              src="https://flone.jamstacktemplates.dev/assets/img/brand-logo/brand-logo-5.png"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="img-fluid"
              src="https://flone.jamstacktemplates.dev/assets/img/brand-logo/brand-logo-4.png"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="img-fluid"
              src="https://flone.jamstacktemplates.dev/assets/img/brand-logo/brand-logo-3.png"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="img-fluid"
              src="https://flone.jamstacktemplates.dev/assets/img/brand-logo/brand-logo-2.png"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="img-fluid"
              src="https://flone.jamstacktemplates.dev/assets/img/brand-logo/brand-logo-1.png"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="img-fluid"
              src="https://flone.jamstacktemplates.dev/assets/img/brand-logo/brand-logo-3.png"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="img-fluid"
              src="https://flone.jamstacktemplates.dev/assets/img/brand-logo/brand-logo-9.png"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="img-fluid"
              src="https://flone.jamstacktemplates.dev/assets/img/brand-logo/brand-logo-8.png"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="img-fluid"
              src="https://flone.jamstacktemplates.dev/assets/img/brand-logo/brand-logo-7.png"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="img-fluid"
              src="https://flone.jamstacktemplates.dev/assets/img/brand-logo/brand-logo-6.png"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="img-fluid"
              src="https://flone.jamstacktemplates.dev/assets/img/brand-logo/brand-logo-3.png"
              alt=""
            />
          </SwiperSlide>
        </Swiper>
      </Container>
      <Container className="team-area pt-5 pb-4">
        <div className="team-header pb-5">
          <h2 className="title position-relative py-3">Team member</h2>
          <p className="w-50 mx-auto my-4 text-muted">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi harum necessitatibus pariatur non quasi a
          </p>
        </div>
        <Row>
          <Col sm="6" md="6" lg="3">
            <div className="team-content">
              <img
                className="img-fluid"
                src="https://res.cloudinary.com/dw6jih4yt/image/upload/e_improve,w_270,h_330,c_thumb,g_auto/v1690184584/ImagesProduct/ceeklyuuw8wfymveagla.png"
                alt="team-avt"
              />
              <div className="description py-4">
                <h4 className="my-2">Tai Le Cong Thanh</h4>
                <span className="text-muted fw-lighter">Developer</span>
              </div>
            </div>
          </Col>
          <Col sm="6" md="6" lg="3">
            <div className="team-content">
              <img
                className="img-fluid"
                src="https://flone.jamstacktemplates.dev/assets/img/team/team-1.jpg"
                alt="team-avt"
              />
              <div className="description py-4">
                <h4 className="my-2">Mr.Mike</h4>
                <span className="text-muted fw-lighter">Manager</span>
              </div>
            </div>
          </Col>
          <Col sm="6" md="6" lg="3">
            <div className="team-content">
              <img
                className="img-fluid"
                src="https://flone.jamstacktemplates.dev/assets/img/team/team-2.jpg"
                alt="team-avt"
              />
              <div className="description py-4">
                <h4 className="my-2">Ms.Queen</h4>
                <span className="text-muted fw-lighter">Manager</span>
              </div>
            </div>
          </Col>
          <Col sm="6" md="6" lg="3">
            <div className="team-content">
              <img
                className="img-fluid"
                src="https://flone.jamstacktemplates.dev/assets/img/team/team-3.jpg"
                alt="team-avt"
              />
              <div className="description py-4">
                <h4 className="my-2">Mr.Peter</h4>
                <span className="text-muted fw-lighter">Chairman</span>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AboutPage;
