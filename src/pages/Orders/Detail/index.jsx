import React from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Table } from "reactstrap";

function DetailOrder({ toggle, modal, data }) {
  return (
    <Modal scrollable size="lg" keyboard isOpen={modal} toggle={() => toggle(null)} centered>
      <ModalHeader toggle={() => toggle(null)}>Detail orders</ModalHeader>
      <ModalBody>
        <Table responsive bordered hover className="m-0">
          <thead>
            <tr>
              <th>Img</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Size</th>
              <th>Color</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(data) && data?.map((el, index) => {
              return (
                <tr key={index}>
                  <td className="align-middle">
                    <img
                      style={{ maxWidth: "150px" }}
                      className="img-fluid"
                      src={el.products.allImg.split(";")[0]}
                      alt=""
                    />
                  </td>
                  <td className="align-middle">{el.products.name}</td>
                  <td className="align-middle">{el.order.quantity}</td>
                  <td className="align-middle">{el.order.size}</td>
                  <td className="align-middle">{el.order.color}</td>
                  <td className="align-middle">
                    {el.products.price?.toLocaleString("vi", { style: "currency", currency: "VND" })}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={() => toggle(null)}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default DetailOrder;
