import { faCheckCircle, faCheckSquare, faCreditCard, faTruck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, Col, Container, Row, Table } from "reactstrap";
import { fetchOrder, fetchProduct, updateStatusTransaction } from "api";
import "./BillStyle.scss";
function Bill() {
  const [dataOrder, SetDataOrder] = useState(null);
  const [dataCart, SetDataCart] = useState(null);
  const [status, SetStatus] = useState(0);
  const location = useLocation();

  //handleGetDataSearch
  const handleGetDataSearch = useCallback(
    (string) => {
      const queryParams = new URLSearchParams(location.search);
      return queryParams.get(string)?.split(" ").at(-1);
    },
    [location.search]
  );

  //handle get idOrder
  const handleIdOrder = () => {
    let paramValue;
    if (location.state !== null) {
      paramValue = location.state;
    } else {
      paramValue = handleGetDataSearch("vnp_OrderInfo");
    }
    return paramValue;
  };
  const id = handleIdOrder();

  //update status of transaction
  useEffect(() => {
    const updateStatus = async () => {
      let responseStatus = +handleGetDataSearch("vnp_ResponseCode");
      if (responseStatus) {
        let statusValue = responseStatus === 0 ? 1 : 2;
        const data = {
          status: statusValue,
        };
        const res = await updateStatusTransaction(id, data);
        SetStatus(+res);
      }
    };
    updateStatus();
  }, [handleGetDataSearch, id]);

  //fetchdata from idOrder
  useEffect(() => {
    const fetchOrderData = async (id) => {
      const response = await fetchOrder(`/${id}`);
      const { order_details, order_items } = response;
      const productRequests = order_items.map((item) => fetchProduct(`/${item.product_id}`));
      const productResponses = await Promise.all(productRequests);
      const dCart = productResponses.map((res, index) => ({
        product: res,
        quantity: order_items[index].quantity,
        size: order_items[index].size,
        color: order_items[index].color,
      }));
      SetDataOrder(order_details);
      SetDataCart(dCart);
    };
    fetchOrderData(id);
  }, [id]);
  return (
    <Container className=" wrap-bill">
      <FontAwesomeIcon size="2xl" icon={faCheckCircle} color="green" />
      <h3 className="my-3">Thank you for your order</h3>
      <p className="my-3 text-muted w-50 mx-auto">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus porro fugit sed eum tenetur consequatur
        dolor atque,repellendus maiores molestias atque impedit.
      </p>
      {dataOrder && (
        <>
          {" "}
          <h5>Your order is: {dataOrder[0]?.id} - PENDING</h5>
          <p className="my-3">Order date: {new Date(dataOrder[0]?.create_at).toLocaleTimeString()}</p>
        </>
      )}
      <Row className="pt-3">
        <Col xs="6" md="3">
          <div className="p-2 col-custom-bill d-flex align-items-center justify-content-start ">
            <FontAwesomeIcon icon={faTruck} />
            <h5 className="text-uppercase ms-2 m-0">Shipping address</h5>
          </div>
          <div className="py-3 px-2 text-start ">
            <p className="m-0">{dataOrder && dataOrder[0]?.name}</p>
            <p className="text-muted m-0">{dataOrder && dataOrder[0]?.address}</p>
          </div>
        </Col>
        <Col xs="6" md="3">
          <div className="p-2 col-custom-bill d-flex align-items-center justify-content-start ">
            <FontAwesomeIcon icon={faCreditCard} />
            <h5 className="text-uppercase ms-2 m-0">Payment method</h5>
          </div>
          <div className="py-3 px-2 text-start">
            <p className="m-0">
              {location.state !== null ? "COD" : handleGetDataSearch("vnp_CardType")}
              {location.state == null &&
                (status === 0 ? (
                  <>
                    - <span className="text-success">Success</span>
                  </>
                ) : (
                  <>
                    - <span className="text-danger">Fail</span>
                  </>
                ))}
            </p>
            <p className="text-muted m-0">
              {location.state !== null ? "Cash on delivery" : handleGetDataSearch("vnp_BankCode")}
            </p>
          </div>
        </Col>
        <Col xs="12" md="6">
          <div className="p-2 col-custom-bill d-flex align-items-center justify-content-start ">
            <FontAwesomeIcon icon={faCheckSquare} />
            <h5 className="text-uppercase ms-2 m-0">Order summary</h5>
          </div>
          <Table responsive className="py-3">
            <tbody>
              {dataCart?.map((el, index) => {
                return (
                  <tr key={index}>
                    <td className="align-middle">
                      <img
                        style={{ maxWidth: "120px" }}
                        className="img-fluid"
                        src={el.product.allImg?.split(";")[0]}
                        alt="#"
                      />
                    </td>
                    <td className="align-middle">
                      <h5>{el.product.name}</h5>
                      <p className="m-0 text-muted text-capitalize">Color: {el.color}</p>
                      <p className="m-0 text-muted text-capitalize">Size: {el.size}</p>
                      <p className="m-0 text-muted">Quantity: {el.quantity}</p>
                    </td>
                    <td className="align-middle">
                      {(el.product.price * el.quantity).toLocaleString("vi", { style: "currency", currency: "VND" })}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <h4 className="py-3 my-3 text-start">Total: {dataOrder && dataOrder[0].total}</h4>
          <div className="d-flex align-items-center justify-content-between">
            <Button color="dark" className="rounded-5 text-uppercase py-2 px-4">
              <Link to="/shop" className="text-decoration-none text-light">
                Continue shopping
              </Link>
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Bill;
