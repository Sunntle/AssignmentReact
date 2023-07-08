import { faEye, faHeart, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Button, Container } from "reactstrap";
import "swiper/css";
import "swiper/css/navigation";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import QuickView from "../QuickView";
import "./NewArrivalStyle.scss";
import { fetchProduct } from "services";
function NewArrival() {
  const [modal, setModal] = useState(false);
  const [product, setProduct] = useState({});
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchProduct(`?_limit=6&_sort=date`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  const toggle = async (id = null) => {
    if (id != null) {
      const res = await fetchProduct(`/${id}`);
      setProduct(res.data);
      setModal(true);
    } else {
      const view = document.documentElement.scrollTop;
      document.querySelector("#newArrival").scrollTo({ top: view, behavior: "smooth" });
      setModal(false);
    }
  };
  return (
    <Container>
      <div className="my-5">
        <h2 className="title position-relative d-inline-block pb-3 mb-3">New Arrival</h2>
        <p className="text-muted">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui odit fugiat iste, nam mollitia rerum inventore!
        </p>
      </div>
      <Swiper
        id="newArrival"
        slidesPerView={1}
        spaceBetween={10}
        // pagination={{ clickable: true }}
        modules={[Pagination]}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        }}
        className="mySwiper"
      >
        {data.map((el) => {
          return (
            <SwiperSlide key={el.id}>
              <div className="position-relative">
                <img className="img-fluid" src={el.img} alt="" />
                <div className="position-absolute badges">
                  <span className="d-block mainColor">New</span>
                </div>
                <div className="product-actions__mid position-absolute d-flex align-items-center justify-content-around">
                  <Button color="dark">
                    <FontAwesomeIcon icon={faShoppingCart} />
                  </Button>
                  <Button color="dark" onClick={() => toggle(el.id)}>
                    <FontAwesomeIcon icon={faEye} />
                  </Button>
                  <Button color="dark">
                    <FontAwesomeIcon icon={faHeart} />
                  </Button>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <QuickView modal={modal} data={product} toggle={toggle} />
    </Container>
  );
}

export default NewArrival;
