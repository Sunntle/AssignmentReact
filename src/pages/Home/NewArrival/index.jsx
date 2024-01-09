import { faEye, faHeart, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useState } from "react";
import { Button, Container } from "reactstrap";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import QuickView from "../QuickView";
import "./NewArrivalStyle.scss";
import { fetchProduct } from "api";
import LoadingComponent from "components/Loading";
import { useDispatch } from "react-redux";
import { addToCart } from "redux/cart/cartSlice";
import { showToast } from "redux/toast/toastSlice";
import { addToWishlist } from "redux/wishlist/wishlistSlice";

function NewArrival({ setToast }) {
  const [modal, setModal] = useState(false);
  const [product, setProduct] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchProduct(`?_limit=6&_sort=date`);
        setData(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }finally{
        setLoading(false)
      }
      
    };
    fetchData();
  }, []);

  const toggle = useCallback(async (id = null) => {
    if (id != null) {
      const res = data?.find(el => el.id === +id)
      setProduct(res);
      setModal(true);
    } else {
      setModal(false);
    }
  },[data]);
  
  const handleAddToCart = useCallback((id) =>{
    const productSelected = data?.find(el => el.id === +id)
    if(data.count < 1) {
      dispatch(showToast({ type: "warning", message: `The item only has ${data.count} left` }));
      return
    }
    dispatch(addToCart({...productSelected, sizeSelected: productSelected?.allSize[0], colorSelected: productSelected?.allColor[0], quantity: 1}))
    dispatch(showToast({ type: "success", message: "Add to cart successfully" }));
  },[data, dispatch])

  const handleAddToWishlist = useCallback((el)=>{
    dispatch(addToWishlist(el))
  },[dispatch])

  return (
    <LoadingComponent isLoading={loading}>
      <Container  className="new-arrival">
        <div className="my-5">
          <h2 className="title position-relative d-inline-block pb-3 mb-3">New Arrival</h2>
          <p className="text-muted w-50 mx-auto">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui odit fugiat iste, nam mollitia rerum inventore!
          </p>
        </div>
        <Swiper
          id="newArrival"
          slidesPerView={1}
          spaceBetween={10}
          navigation
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
          }}
          modules={[Navigation, Autoplay]}
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
          {Array.isArray(data) && data && data.length > 0 &&
            data?.map((el, index) => {
              return (
                <SwiperSlide key={index} className="shadow-sm">
                  <div className="position-relative shadow-sm">
                    <img className="img-fluid" src={el.allImg?.split(";")[0]} alt="" />
                    <div className="position-absolute badges">
                      <span className="d-block mainColor">New</span>
                    </div>
                    <div className="product-actions__mid position-absolute d-flex align-items-center justify-content-around">
                      <Button color="dark">
                        <FontAwesomeIcon icon={faShoppingCart} onClick={() => handleAddToCart(el.id)}/>
                      </Button>
                      <Button color="dark" onClick={() => toggle(el.id)}>
                        <FontAwesomeIcon icon={faEye} />
                      </Button>
                      <Button color="dark">
                        <FontAwesomeIcon icon={faHeart} onClick={() => handleAddToWishlist(el)}/>
                      </Button>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
        </Swiper>
        {modal && <QuickView modal={modal} data={product} toggle={toggle} setToast={setToast} />}
      </Container>
    </LoadingComponent>
  );
}

export default NewArrival;
