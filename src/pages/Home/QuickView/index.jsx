import { faMinusCircle, faPlusCircle, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useState } from "react";
import { Button, Col, FormGroup, Input, Modal, ModalBody, ModalFooter, ModalHeader, Row, Form } from "reactstrap";
import "./QuickViewStyle.scss";
import { useDispatch } from "react-redux";
import { addToCart } from "redux/cart/cartSlice";
import { Controller, useForm } from "react-hook-form";
import { InputLabel } from "components/Input";
import { showToast } from "redux/toast/toastSlice";
import { addToWishlist } from "redux/wishlist/wishlistSlice";

function QuickView(props) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const [value, setValue] = useState(1);
  const { modal, toggle, data } = props;
  const dispatch = useDispatch();
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
    const item = { ...data, ...dataForm, quantity: value };
    dispatch(addToCart(item));
    const actionsToast = { type: "success", message: "Add to cart successfully" };
    dispatch(showToast(actionsToast));
  };

  const handleAddToWishlist = useCallback((el)=>{
    dispatch(addToWishlist(data))
  },[data, dispatch])
  
  return (
    <div>
      <Modal scrollable size="lg" keyboard isOpen={modal} toggle={() => toggle(null)} centered>
        <ModalHeader toggle={() => toggle(null)}></ModalHeader>
        <ModalBody>
          <Row>
            <Col xs="12" md="5" className="mb-3">
              <img src={data.allImg?.split(";")[0]} alt="img" className="img-fluid" />
            </Col>
            <Col xs="12" md="7">
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
                iste ipsum ipsam obcaecati nihil sint autem sit, numquam et dolores? Odio totam quidem obcaecati
                corporis.
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
                <div style={{cursor: "pointer"}} className="text-dark text-decoration-none" onClick={handleAddToWishlist}>+ Add to wish list</div>
              </div>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => toggle(null)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default QuickView;
