import React, { useEffect, useState } from "react";
import { Col, Progress, Row, Table } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBurger, faComment, faPenNib, faUser } from "@fortawesome/free-solid-svg-icons";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { fetchOrder, fetchProduct, fetchTypeProduct, fetchUser } from "services";
import moment from "moment";
function Dashboard() {
  const [allData, SetData] = useState(null);
  useEffect(() => {
    const getData = async () => {
      try {
        const request = [fetchProduct("?_sort=sold"), fetchOrder("?_sort=create_at"), fetchTypeProduct(), fetchUser()];
        const res = await Promise.all(request);
        if (res) {
          const [product, order, typeProduct, user] = res;
          SetData({ product, order, typeProduct, user });
        }
      } catch (err) {
        console.log(`Error: ${err}`);
      }
    };
    getData();
  }, []);
  ChartJS.register(ArcElement, Tooltip, Legend);
  const data = {
    labels: ["Jacket", "Bottoms", "Top", "Sock", "Pants", "Hoodie"],
    datasets: [
      {
        label: "Count",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <>
      <Row className="pt-5 text-white">
        <Col xs="12" md="6" lg="3" className="border rounded bg-success d-flex align-items-center py-4">
          <FontAwesomeIcon icon={faUser} size="xl" className="border border-4 rounded-circle p-3  m-2" />
          <div className="text-start ps-3">
            <h6>Customer</h6>
            <span>
              <b>{allData?.user.length} User</b>
            </span>
          </div>
        </Col>
        <Col xs="12" md="6" lg="3" className="border rounded bg-danger d-flex align-items-center  ">
          <FontAwesomeIcon icon={faBurger} size="xl" className="border border-4  rounded-circle p-3 m-2" />

          <div className="text-start ps-3">
            <h6>Product</h6>
            <span>
              <b>{allData?.product.length} Items</b>
            </span>
          </div>
        </Col>
        <Col xs="12" md="6" lg="3" className="border rounded bg-primary d-flex align-items-center  ">
          <FontAwesomeIcon icon={faComment} size="xl" className="border border-4 rounded-circle p-3 m-2" />

          <div className="text-start ps-3">
            <h6>Order</h6>
            <span>
              <b>{allData?.order.length} Orders</b>
            </span>
          </div>
        </Col>
        <Col xs="12" md="6" lg="3" className="border rounded d-flex align-items-center   bg-info">
          <FontAwesomeIcon icon={faPenNib} size="xl" className="border border-4 rounded-circle p-3 m-2" />
          <div className="text-start ps-3">
            <h6>Type Product</h6>
            <span>
              <b>{allData?.typeProduct.length} items</b>
            </span>
          </div>
        </Col>
      </Row>
      <Row className="align-items-center justify-content-center py-4">
        <Col xs="5" className="bg-transparent h-100">
          <Pie data={data} />
        </Col>
        <Col xs="7" className="col-7 pe-0 ">
          <div className="p-4 shadow">
            <h4>Status Order</h4>
            <Table hover bordered responsive>
              <thead className="table-light">
                <tr>
                  <th scope="col">Order code</th>
                  <th scope="col">Total</th>
                  <th scope="col">Date</th>
                  <th scope="col">State</th>
                </tr>
              </thead>
              <tbody>
                {allData?.order.map((el, index) => {
                  return (
                    index < 8 && (
                      <tr key={index}>
                        <td>{el.id}</td>
                        <td>{el.total}</td>
                        <td>{moment(new Date(el.create_at)).format("DD-MM-YYYY")}</td>
                        {el.status === 0 ? (
                          <td className="text-success">Completed</td>
                        ) : el.status === 1 ? (
                          <td className="text-warning">Pending</td>
                        ) : (
                          <td className="text-danger">Cancle</td>
                        )}
                      </tr>
                    )
                  );
                })}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
      <Row className="shadow p-4">
        <h4 className="fw-semibold">Top Product</h4>

        <Table hover responsive>
          <thead className="table-light">
            <tr>
              <th scope="col">Product</th>
              <th scope="col">Sales</th>
              <th scope="col">Earning</th>
              <th scope="col">Inventory</th>
            </tr>
          </thead>
          <tbody>
            {allData?.product.map((el, index) => {
              const value = Math.ceil(Math.random() * 100);
              return (
                index < 6 && (
                  <tr key={index}>
                    <td>{el.name}</td>
                    <td>{el.sold}</td>
                    <td>{el.price.toLocaleString("vi", { style: "currency", currency: "VND" })}</td>
                    <td>
                      <div className="d-flex justify-content-center align-items-center">
                        <Col xs="8">
                          <Progress
                            value={value}
                            color={index % 3 === 0 ? "danger" : index % 2 === 0 ? "success" : "warning"}
                            style={{ height: "3px" }}
                          ></Progress>
                        </Col>
                        <Col xs="4" className="text-center text-muted">
                          {value}
                        </Col>
                      </div>
                    </td>
                  </tr>
                )
              );
            })}
          </tbody>
        </Table>
      </Row>
    </>
  );
}

export default Dashboard;
