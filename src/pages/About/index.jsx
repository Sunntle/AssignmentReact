import { faBriefcase} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { animated, useInView, useSprings } from "@react-spring/web";
import FadeAnimation from "animations/FadeAnimation";
import { forwardRef } from "react";
import { Col, Container, Row } from "reactstrap";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "./AboutStyle.scss";
import { useBreakpoints } from "hooks/useBreakpoints";
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

const LIST_MEMBER = [
  {
    img: "https://res.cloudinary.com/dw6jih4yt/image/upload/e_improve,w_270,h_330,c_thumb,g_auto/v1690184584/ImagesProduct/ceeklyuuw8wfymveagla.png",
    name: "Tai Le Cong Thanh",
    position: "Developer",
    delay: 0,
  },
  {
    img: "https://flone.jamstacktemplates.dev/assets/img/team/team-1.jpg",
    name: "Mike Tyson",
    position: "Manager",
    delay: 300,
  },
  {
    img: "https://flone.jamstacktemplates.dev/assets/img/team/team-2.jpg",
    name: "Ms.Queen",
    position: "Manager",
    delay: 450,
  },
  {
    img: "https://flone.jamstacktemplates.dev/assets/img/team/team-3.jpg",
    name: "Peter",
    position: "Chairman",
    delay: 600,
  },
];

const COUNT_NUMBER = [{count: 200, title: "Project Done"}, {count: 360, title: "User Register"}, {count: 1000, title: "Reviews"}, {count: 80, title: "Online"}];
function AboutPage() {
  const breakpointsData = useBreakpoints()
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.5, 
  });
  const [ref2, inView2] = useInView({
    triggerOnce: false,
    threshold: 0.5, 
  })
  const [ref3, inView3] = useInView({
    triggerOnce: false,
    threshold: 0.5,
  })
  const renderSprings = useSprings(
    items.length,
    items.map((item) => ({
      from: { opacity: 0 },
      to: { opacity: 1 },
      config: { duration: 400 },
      delay: item.delay,
    }))
  );
  const renderCountNumber = useSprings(
    COUNT_NUMBER.length,
    COUNT_NUMBER.map(item=>({
      from: { opacity: 0, count: 0},
      to: { opacity: inView ? 1 : 0, count: inView ? item.count : 0 },
      config: { duration: 600 },
    }))
  )
  const renderListMember = useSprings(
    LIST_MEMBER.length,
    LIST_MEMBER.map((item) => ({
      from: { opacity: 0 },
      to: { opacity: inView3 || breakpointsData.isXs ? 1 : 0},
      config: { duration: 400 },
      delay: item.delay,
    }))
  );
  return (
    <div className="about-wrap">
      <Container className="welcome-content mt-3 mt-xs-5 mb-4 pb-4">
        <FadeAnimation className="pb-5">
          <h5 className="text-muted m-0">Who we are</h5>
          <h2 className="title position-relative py-3">Welcome To Clothing26</h2>
          <p className="w-50 mx-auto my-4 text-muted">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi harum necessitatibus pariatur non quasi a
            dolor quis repudiandae temporibus vero veniam quaerat dolorem odit porro, et ullam molestiae earum
            voluptates.
          </p>
        </FadeAnimation>
        <Row className="text-start ">
          {renderSprings.map((el, index) => {
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
      <animated.div className="pt-5 pb-4 funfact-content" ref={ref} style={{inView}}>
        <Container className="py-5">
          <Row>
            {renderCountNumber.map((style, index)=>{
              return <Col sm="6" md="6" lg="3" key={index}>
              <div>
                <FontAwesomeIcon size="2xl" icon={faBriefcase} />
              </div>
              <animated.h2 className="count my-3" style={style}>{style.count.to((value) => Math.floor(value))}</animated.h2>
              <p className="fs-5">{COUNT_NUMBER[index].title}</p>
            </Col>
            })}
          </Row>
        </Container>
      </animated.div>
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
          {[...Array(9)].map((_, index)=>{
            return <SwiperSlide key={index}>
            <img
              className="img-fluid"
              src={`https://flone.jamstacktemplates.dev/assets/img/brand-logo/brand-logo-${index}.png`}
              alt=""
            />
          </SwiperSlide>
          })}
        </Swiper>
      </Container>
      <Container className="team-area pt-5 pb-4" >
        <animated.div ref={ref2} className="team-header pb-5" style={{inView2}}>
          <h2 className="title position-relative py-3">Team member</h2>
          <p className="w-50 mx-auto my-4 text-muted">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi harum necessitatibus pariatur non quasi a
          </p>
        </animated.div>
       <animated.div ref={ref3} style={{inView3}}>
       <Row>
          {renderListMember.map((style, index)=>{
            return <Col sm="6" md="6" lg="3" key={index}>
            <animated.div style={style} className="team-content">
              <img
                className="img-fluid"
                src={LIST_MEMBER[index].img}
                alt="team-avt"
              />
              <div className="description py-4">
                <h4 className="my-2">{LIST_MEMBER[index].name}</h4>
                <span className="text-muted fw-lighter">{LIST_MEMBER[index].position}</span>
              </div>
            </animated.div>
          </Col>
          })}
        </Row>
       </animated.div>
      </Container>
    </div>
  );
}

export default forwardRef(AboutPage);
