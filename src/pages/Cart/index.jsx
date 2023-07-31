import { faCartShopping, faClose, faMinusCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { Button, Col, Container, Form, FormGroup, Input, Row, Table } from "reactstrap";
import "./CartStyle.scss";
import "../Checkout/CheckoutStyle.scss";
import { useDispatch, useSelector } from "react-redux";
import { removeAll, removeItem, updateCart } from "redux/cart/cartSlice";
import { showToast } from "redux/toast/toastSlice";
import { Controller, useForm } from "react-hook-form";
import { InputLabel } from "components/Input";
function Cart() {
  const cart = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();
  const { handleSubmit, control } = useForm();

  const handleIncrement = ({ ...product }) => {
    product.quantity += 1;
    dispatch(updateCart(product));
    const actionsToast = { type: "info", message: "Updated product successfully!" };
    dispatch(showToast(actionsToast));
  };

  const handleDecrement = ({ ...product }) => {
    if (product.quantity < 2) return;
    product.quantity -= 1;
    dispatch(updateCart(product));
    const actionsToast = { type: "info", message: "Updated product successfully!" };
    dispatch(showToast(actionsToast));
  };
  const clearCart = () => {
    dispatch(removeAll());
    const actionsToast = { type: "warning", message: "Cart empty!" };
    dispatch(showToast(actionsToast));
  };
  const handleRemoveItem = (product) => {
    dispatch(removeItem(product));
    const actionsToast = { type: "danger", message: "Deleted product successfully!" };
    dispatch(showToast(actionsToast));
  };
  const onSubmit = (data) => {
    console.log(data);
  };
  if (cart.length < 1)
    return (
      <Container className="cart py-5">
        <div className="my-5">
          <h1>
            <FontAwesomeIcon icon={faCartShopping} className="cartIconEmpty" />
          </h1>
          <h4 className="text-muted py-3">No item found in cart</h4>
          <Link to="/shop" color="dark" className="btn btn-dark text-uppercase py-2 px-4">
            Shop now
          </Link>
        </div>
      </Container>
    );
  return (
    <Container className="cart py-5">
      <div className="my-5">
        <h3>Your cart items</h3>
        <Table responsive>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>QTy</th>
              <th>Subtotal</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {cart.map((el, index) => {
              return (
                <tr key={index}>
                  <td>
                    <img className="img-fluid" src={el.allImg?.split(";")[0]} alt="img" />
                  </td>
                  <td>
                    <div className="d-inline-block">
                      <Link to="/" className="text-decoration-none text-dark fw-bolder">
                        <h5>{el.name}</h5>
                      </Link>
                      {el.colorSelected && <p className="my-3 text-capitalize">Color: {el.colorSelected}</p>}
                      {el.sizeSelected && <p className="text-capitalize">Size: {el.sizeSelected}</p>}
                    </div>
                  </td>
                  <td className="price">{el.price.toLocaleString("vi", { style: "currency", currency: "VND" })}</td>
                  <td>
                    <div className="quantityBtn d-flex align-items-center justify-content-center ">
                      <FontAwesomeIcon icon={faMinusCircle} onClick={() => handleDecrement(el)} />
                      <Input type="text" value={el.quantity} className="border-0 bg-transparent" disabled></Input>
                      <FontAwesomeIcon icon={faPlusCircle} onClick={() => handleIncrement(el)} />
                    </div>
                  </td>
                  <td>{(el.price * el.quantity).toLocaleString("vi", { style: "currency", currency: "VND" })}</td>
                  <td>
                    <Button outline color="transparent" onClick={() => handleRemoveItem(el)}>
                      <FontAwesomeIcon icon={faClose} color="black" />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <div className="d-flex align-items-center justify-content-between">
          <Button color="dark" className="rounded-5 text-uppercase py-2 px-4">
            <Link to="/shop" className="text-decoration-none text-light">
              Continue shopping
            </Link>
          </Button>
          <Button color="dark" onClick={() => clearCart()} className="rounded-5 text-uppercase py-2 px-4">
            Clear shopping cart
          </Button>
        </div>
        <Row>
          <Col xs="12" lg="5" className="mt-5 order-2 order-lg-1">
            <h3>Use Coupon Code</h3>
            <div className="wrap-your-order p-4 shadown-sm rounded my-3">
              <p className="text-muted my-3">Enter your coupon code if you have one</p>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <FormGroup className="text-start">
                  <Controller
                    name="coupon"
                    control={control}
                    defaultValue=""
                    rules={{ required: true }}
                    render={({
                      field: { onChange, onBlur, value, name, ref },
                      fieldState: { invalid, isTouched, isDirty, error },
                      formState,
                    }) => (
                      <InputLabel
                        name={name}
                        onBlur={onBlur}
                        onChange={onChange}
                        placeholder="Coupon"
                        inputRef={ref}
                        error={error}
                      />
                    )}
                  />
                </FormGroup>
              </Form>
            </div>

            <Link className="btn w-50 btn-secondary text-uppercase my-3 py-2 px-auto text-white btn-confirm rounded-5">
              Apply coupon
            </Link>
          </Col>
          <Col xs="12" lg="7" className="mt-5 order-1 order-lg-2">
            <h3>Your Order</h3>
            <div className="wrap-your-order p-4 shadown-sm rounded my-3">
              <div className="d-flex justify-content-between border-bottom py-3">
                <h4>Product</h4>
                <h4>Total</h4>
              </div>
              <div className="border-bottom py-4">
                {cart.map((el, index) => {
                  return (
                    <div className="d-flex" key={index}>
                      <Col xs="6" className="text-start">
                        <p className="m-0">
                          {el.name} - <span className="text-capitalize">{el.colorSelected}</span> - {el.sizeSelected} -
                          X{el.quantity}
                        </p>
                      </Col>
                      <Col xs="6" className="text-end">
                        <p className="m-0">
                          {(el.price * el.quantity).toLocaleString("vi", { style: "currency", currency: "VND" })}
                        </p>
                      </Col>
                    </div>
                  );
                })}
              </div>
              <div className="d-flex justify-content-between border-bottom py-4">
                <h6>Shipping</h6>
                <h6>Free shipping</h6>
              </div>
              <div className="d-flex justify-content-between py-3">
                <h4>Total</h4>
                <h4 className="your-order__price">
                  {cart
                    .reduce((acc, cur) => {
                      return acc + cur.price * cur.quantity;
                    }, 0)
                    .toLocaleString("vi", { style: "currency", currency: "VND" })}
                </h4>
              </div>
            </div>
            <Link
              to="/checkout"
              className="btn w-50 btn-secondary text-uppercase my-3 py-2 px-auto text-white btn-confirm rounded-5"
            >
              Proceed to checkout
            </Link>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default Cart;
