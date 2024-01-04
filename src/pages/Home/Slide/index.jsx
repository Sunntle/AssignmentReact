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
function Slide() {
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
      <SwiperSlide className="position-relative">
        <img className="img-fluid" src={Slides} alt="" />
        <FadeAnimation>
        <div className="position-absolute caption">
          <h6>Summer Collection</h6>
          <h2>
            Fall - Winter Collections <span className="d-none d-sm-block">2030</span>
          </h2>
          <p className="d-none d-md-block">
            A specialist label creating luxury essentials. Ethically crafted with an unwavering commitment to
            exceptional quality.
          </p>
          <Link to="shop" className="btn btn-dark py-2 px-3 buttonRedirect">
            <span className="redirectShop">SHOP NOW</span>
          </Link>
        </div>
        </FadeAnimation>
       
      </SwiperSlide>
      <SwiperSlide className="position-relative">
        <img className="img-fluid" src={Sildes2} alt="" />
        <div className="position-absolute caption">
          <h6>Winter Collection</h6>
          <h2>
            Fall - Winter Collections <span className="d-none d-sm-block">2030</span>
          </h2>
          <p className="d-none d-md-block">
            Lorem iuunt vero id consequatur reiciendt molestiae magni vel necessitatibus sapiente explicabo veniam,
            deserunt dolor earum dicta.
          </p>
          <Link to="shop" className="btn btn-dark py-2 px-3 buttonRedirect">
            <span className="redirectShop">SHOP NOW</span>
          </Link>
        </div>
      </SwiperSlide>
      <SwiperSlide className="position-relative">
        <img className="img-fluid" src={Slides} alt="" />
        <div className="position-absolute caption">
          <h6>Summer Collection</h6>
          <h2>
            Fall - Winter Collections <span className="d-none d-sm-block">2030</span>
          </h2>
          <p className="d-none d-md-block">
            Lorem iuunt vero id magni vel necessitatibus sapiente explicabo veniam, deserunt dolor earum dicta.
          </p>
          <Link to="shop" className="btn btn-dark py-2 px-3 buttonRedirect">
            <span className="redirectShop">SHOP NOW</span>
          </Link>
        </div>
      </SwiperSlide>
      <SwiperSlide className="position-relative">
        <img className="img-fluid" src={Sildes2} alt="" />
        <div className="position-absolute caption">
          <h6>Summer Collection</h6>
          <h2>
            Fall - Winter Collections <span className="d-none d-sm-block">2030</span>
          </h2>
          <p className="d-none d-md-block">
            Lorem iuunt vero id consequatur reiciendt molestiae magni vel necessitatibus sapiente explicabo veniam,
            deserunt dolor earum dicta consequatur reiciendt molestiae magni.
          </p>
          <Link to="shop" className="btn btn-dark py-2 px-3 buttonRedirect">
            <span className="redirectShop">SHOP NOW</span>
          </Link>
        </div>
      </SwiperSlide>
    </Swiper>
  );
}

export default Slide;
