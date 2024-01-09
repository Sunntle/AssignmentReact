import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Slides from "assets/images//hero-1.jpg";
import Sildes2 from "assets/images//hero-2.jpg";
import "./SlideStyle.scss";
import FadeAnimation from "animations/FadeAnimation";
import { useBreakpoints } from "hooks/useBreakpoints";
import { truncateString } from "utils/helper";
import { useMemo } from "react";

const slides = [
  {
    title: "Spring Collection",
    caption: "A specialist label creating luxury essentials. Ethically crafted with an unwavering commitment to exceptional quality.",
    img: Slides
  },
  {
    title: "Summer Collection",
    caption: "Lorem iuunt vero id consequatur reiciendt molestiae magni vel necessitatibus sapiente explicabo veniam, deserunt dolor earum dicta.",
    img: Sildes2
  },
  {
    title: "Fall Collection",
    caption: "Lorem iuunt vero id magni vel necessitatibus sapiente explicabo veniam, deserunt dolor earum dicta.",
    img: Slides

  },
  {
    title: "Winter Collection",
    caption: "Lorem iuunt vero id consequatur reiciendt molestiae magni vel necessitatibus sapiente explicabo veniam, deserunt dolor earum dicta consequatur reiciendt molestiae magni.",
    img: Sildes2
  }
]
function Slide() {
  const breakpointData = useBreakpoints();
  const isLargerXL = useMemo(()=> breakpointData.isXL || breakpointData.isXXL, [breakpointData])
  return (
    <Swiper
      modules={[Pagination, EffectFade, Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      loop={false}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      effect="fade"
      pagination={{ clickable: true, dynamicBullets: true }}
    >
      {slides.map((slide, index)=>{
        return <SwiperSlide key={index} className="position-relative">
        <img className="img-fluid" src={slide.img} alt="" />
        <FadeAnimation>
        <div className="position-absolute caption">
          <h6>{slide.title}</h6>
          <h2>
            Fall - Winter Collections <span className="d-none d-sm-block">2030</span>
          </h2>
          <p className="d-none d-md-block">
            { isLargerXL ? slide.caption : truncateString(slide.caption, 30)}
          </p>
          <Link to="shop" className="btn btn-dark py-2 px-3 buttonRedirect">
            <span className="redirectShop">SHOP NOW</span>
          </Link>
        </div>
        </FadeAnimation>
      </SwiperSlide>
      })}
    </Swiper>
  );
}

export default Slide;
