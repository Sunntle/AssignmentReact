import { faCartShopping, faClose, faMinusCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Input, Table } from "reactstrap";
import "./CartStyle.scss";
function Cart() {
  const [value, setValue] = useState(1);
  const handleIncrement = () => {
    setValue((prevValue) => prevValue + 1);
  };

  const handleDecrement = () => {
    setValue((prevValue) => {
      if (prevValue < 2) return 1;
      return prevValue - 1;
    });
  };
  const cart = JSON.parse(localStorage.getItem("cart"));
  if (!cart)
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
        <Table className="table-responsive">
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
            <tr>
              <td>
                <img
                  className="img-fluid"
                  src="https://flone.jamstacktemplates.dev/assets/img/product/fashion/1.jpg"
                  alt="img"
                />
              </td>
              <td>
                <div className="text-start d-inline-block">
                  <Link to="/" className="text-decoration-none text-dark fw-bolder">
                    <h5>Product name here</h5>
                  </Link>
                  <p className="my-3">Color: white</p>
                  <p>Size: M</p>
                </div>
              </td>
              <td className="price">12.99$</td>
              <td>
                <div className="quantityBtn d-flex align-items-center justify-content-center ">
                  <FontAwesomeIcon icon={faMinusCircle} onClick={handleDecrement} />
                  <Input type="text" value={value} className="border-0 bg-transparent" disabled></Input>
                  <FontAwesomeIcon icon={faPlusCircle} onClick={handleIncrement} />
                </div>
              </td>
              <td>{value * 12.99}$</td>
              <td>
                <Button outline color="transparent">
                  <FontAwesomeIcon icon={faClose} color="black" />
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
        <div className="d-flex align-items-center justify-content-between">
          <Button color="dark" className="rounded-5 text-uppercase py-2 px-4">
            Continue shopping
          </Button>
          <Button color="dark" className="rounded-5 text-uppercase py-2 px-4">
            Clear shopping cart
          </Button>
        </div>
      </div>
    </Container>
  );
}

export default Cart;
