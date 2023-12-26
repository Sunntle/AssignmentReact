import moment from "moment";
import React, { useState } from "react";
import { Button, Table } from "reactstrap";
import { fetchOrder } from "api";
import DetailOrder from "../Detail";

function OrderList({ orders, cancleOrders, cancle }) {
  const [modal, setModal] = useState(false);
  const [product, setProduct] = useState(null);
  const toggle = async (id = null) => {
    if (id != null) {
      const res = await fetchOrder(`/order_items/${id}`);
      setProduct(res);
      setModal(true);
    } else {
      setModal(false);
    }
  };
  return (
    <div className="shadow p-4 text-center">
      <Table responsive bordered hover className="m-0">
        <thead>
          <tr>
            <th>#Order</th>
            <th>Total</th>
            <th>Date</th>
            <th>Payment</th>
            <th>Status</th>
            <th>Ship to</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((el, index) => {
            return (
              <tr key={index}>
                <td>{el.id}</td>
                <td>{el.total}</td>
                <td>{moment(el.date).format("DD-MM-YYYY")}</td>
                <td>{el.payment_id}</td>
                <td>
                  {el.status === 1 ? (
                    <span className="text-warning">Pending</span>
                  ) : el.status === 2 ? (
                    <span className="text-danger">Fail</span>
                  ) : (
                    <span className="text-success">Success</span>
                  )}
                </td>
                <td>{el.address}</td>
                <td>
                  <Button color="dark" onClick={() => toggle(el.id)}>
                    Detail
                  </Button>
                  {cancle && (
                    <Button color="danger" onClick={() => cancleOrders(el.id)}>
                      Cancle
                    </Button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
        {modal && <DetailOrder modal={modal} toggle={toggle} data={product} />}
      </Table>
    </div>
  );
}

export default OrderList;
