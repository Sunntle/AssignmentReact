import { faMinusCircle, faPlusCircle, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Col, Container, Form, FormGroup, Input, Row } from "reactstrap";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
// import required modules
import { faFacebook, faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FreeMode, Thumbs } from "swiper/modules";
import "../Home/QuickView/QuickViewStyle.scss";
import "./ShopDetailStyle.scss";
import { fetchProduct } from "services";
import { useDispatch } from "react-redux";
import { addToCart } from "redux/cart/cartSlice";
import { Controller, useForm } from "react-hook-form";
import { InputLabel } from "components/Input";
import { showToast } from "redux/toast/toastSlice";
import LoadingComponent from "components/Loading";
function ShopDetail() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const indexProduct = useParams();
  const [value, setValue] = useState(1);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchProduct(`/${indexProduct.id}`);
        setData(res);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [indexProduct.id]);

  const handleIncrement = () => {
    setValue((prevValue) => prevValue + 1);
  };

  const handleDecrement = () => {
    setValue((prevValue) => {
      if (prevValue < 2) return 1;
      return prevValue - 1;
    });
  };

  const onSubmit = (dataForm) => {
    const action = addToCart({ ...data, ...dataForm, quantity: value });
    dispatch(action);
    const actionsToast = { type: "success", message: "Add to cart successfully!" };
    dispatch(showToast(actionsToast));
  };
  return (
    <Container className="py-5 wrap-shop-detail">
      {loading ? (
        <LoadingComponent />
      ) : (
        <Row className="my-5">
          <Col xs="12" sm="6">
            <Swiper
              thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
              modules={[FreeMode, Thumbs]}
              className="mySwiper2"
            >
              {data.allImg?.split(";").map((el, index) => {
                return (
                  <SwiperSlide key={index}>
                    <img alt="img" className="img-fluid" src={el} />
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={10}
              slidesPerView={4}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Thumbs]}
              className="mySwiper"
            >
              {data.allImg?.split(";").map((el, index) => {
                return (
                  <SwiperSlide key={index}>
                    <img alt="img" src={el} />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </Col>
          <Col xs="12" sm="6" className="text-start">
            <h2>{data.name}</h2>
            <p className="py-3 m-0">{data.price?.toLocaleString("vi", { style: "currency", currency: "VND" })}</p>
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
            <Form onSubmit={handleSubmit(onSubmit)}>
              {data.allColor && (
                <FormGroup className="colorContainer">
                  <div>
                    <p className="m-0">Color</p>
                    <Controller
                      name={"colorSelected"}
                      control={control}
                      defaultValue=""
                      rules={{ required: "You have to choose 1 color" }}
                      render={({
                        field: { onChange, onBlur, value, name, ref },
                        fieldState: { invalid, isTouched, isDirty, error },
                        formState,
                      }) =>
                        data.allColor
                          ?.split(",")
                          .map((el, index) => (
                            <InputLabel
                              key={el + index}
                              id={el}
                              value={el}
                              name={name}
                              type="radio"
                              onBlur={onBlur}
                              onChange={onChange}
                            />
                          ))
                      }
                    />
                    {errors?.colorSelected && (
                      <p className="text-danger m-0 fw-lighter text fst-italic">{errors.colorSelected.message}</p>
                    )}
                  </div>
                </FormGroup>
              )}
              {data.allSize && (
                <FormGroup className="sizeContainer">
                  <div>
                    <p className="m-0">Size</p>
                    <Controller
                      name="sizeSelected"
                      control={control}
                      defaultValue=""
                      rules={{ required: "You have to choose 1 size" }}
                      render={({
                        field: { onChange, onBlur, value, name, ref },
                        fieldState: { invalid, isTouched, isDirty, error },
                        formState,
                      }) =>
                        data.allSize?.split(",").map((el, index) => {
                          return (
                            <div key={el + index} className="d-inline-flex align-items-center">
                              <InputLabel
                                id={el}
                                value={el}
                                name={name}
                                type="radio"
                                onBlur={onBlur}
                                onChange={onChange}
                              />
                              <span className="text-uppercase">{el}</span>
                            </div>
                          );
                        })
                      }
                    />
                    {errors?.sizeSelected && (
                      <p className="text-danger m-0 fw-lighter text fst-italic">{errors.sizeSelected.message}</p>
                    )}
                  </div>
                </FormGroup>
              )}

              <div className="quantity d-flex align-items-center">
                <div className="quantityBtn d-flex align-items-center justify-content-center ">
                  <FontAwesomeIcon icon={faMinusCircle} onClick={handleDecrement} />
                  <Input type="text" value={value} className="border-0 bg-transparent" disabled></Input>
                  <FontAwesomeIcon icon={faPlusCircle} onClick={handleIncrement} />
                </div>
                <div className="cartBtn">
                  <Button type="submit" className="btn-dark rounded-0 py-2 px-3">
                    <span className="redirectShop">ADD TO CART</span>
                  </Button>
                </div>
              </div>
            </Form>
            <div className="wishlist my-3 d-inline-block border-bottom border-dark">
              <Link className="text-dark text-decoration-none">+ Add to wish list</Link>
            </div>
            <div className="social d-flex">
              <FontAwesomeIcon icon={faFacebook} className="fs-3" />
              <FontAwesomeIcon icon={faTwitter} className="fs-3" />
              <FontAwesomeIcon icon={faLinkedin} className="fs-3" />
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default ShopDetail;
