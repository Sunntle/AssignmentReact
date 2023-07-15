import React from "react";
import { Col, Progress, Row, Table } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBurger, faComment, faPenNib, faUser } from "@fortawesome/free-solid-svg-icons";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

function Dashboard() {
  ChartJS.register(ArcElement, Tooltip, Legend);
  const data = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
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
              <b>200 User</b>
            </span>
          </div>
        </Col>
        <Col xs="12" md="6" lg="3" className="border rounded bg-danger d-flex align-items-center  ">
          <FontAwesomeIcon icon={faBurger} size="xl" className="border border-4  rounded-circle p-3 m-2" />

          <div className="text-start ps-3">
            <h6>Product</h6>
            <span>
              <b>100 Items</b>
            </span>
          </div>
        </Col>
        <Col xs="12" md="6" lg="3" className="border rounded bg-primary d-flex align-items-center  ">
          <FontAwesomeIcon icon={faComment} size="xl" className="border border-4 rounded-circle p-3 m-2" />

          <div className="text-start ps-3">
            <h6>Comment</h6>
            <span>
              <b>20 Comment</b>
            </span>
          </div>
        </Col>
        <Col xs="12" md="6" lg="3" className="border rounded d-flex align-items-center   bg-info">
          <FontAwesomeIcon icon={faPenNib} size="xl" className="border border-4 rounded-circle p-3 m-2" />
          <div className="text-start ps-3">
            <h6>Posts</h6>
            <span>
              <b>10 Posts</b>
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
                  <th scope="col">Product</th>
                  <th scope="col">Price</th>
                  <th scope="col">Date</th>
                  <th scope="col">State</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Glossy Tee</td>
                  <td>200</td>
                  <td>2023-02-15</td>
                  <td className="text-success">Completed</td>
                </tr>
                <tr>
                  <td>Glossy Tee</td>
                  <td>200</td>
                  <td>2023-02-15</td>
                  <td className="text-warning">Pending</td>
                </tr>
                <tr>
                  <td>Glossy Tee</td>
                  <td>200</td>
                  <td>2023-02-15</td>
                  <td className="text-danger">Cancelled</td>
                </tr>
                <tr>
                  <td>Glossy Tee</td>
                  <td>200</td>
                  <td>2023-02-15</td>
                  <td className="text-success">Completed</td>
                </tr>
                <tr>
                  <td>Glossy Tee</td>
                  <td>200</td>
                  <td>2023-02-15</td>
                  <td className="text-warning">Pending</td>
                </tr>
                <tr>
                  <td>Glossy Tee</td>
                  <td>200</td>
                  <td>2023-02-15</td>
                  <td className="text-success">Completed</td>
                </tr>
                <tr>
                  <td>Glossy Tee</td>
                  <td>200</td>
                  <td>2023-02-15</td>
                  <td className="text-warning">Pending</td>
                </tr>
                <tr>
                  <td>Glossy Tee</td>
                  <td>200</td>
                  <td>2023-02-15</td>
                  <td className="text-success">Completed</td>
                </tr>
                <tr>
                  <td>Glossy Tee</td>
                  <td>200</td>
                  <td>2023-02-15</td>
                  <td className="text-success">Completed</td>
                </tr>
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
            <tr>
              <td>Glossy Tee</td>
              <td>200</td>
              <td>$400.00</td>
              <td>
                <div className="d-flex justify-content-center align-items-center">
                  <Col xs="8">
                    <Progress value={20} color="danger" style={{ height: "3px" }}></Progress>
                  </Col>
                  <Col xs="4" className="text-center text-muted">
                    20
                  </Col>
                </div>
              </td>
            </tr>
            <tr>
              <td>Glossy Tee</td>
              <td>200</td>
              <td>$400.00</td>
              <td>
                <div className="d-flex justify-content-center align-items-center">
                  <Col xs="8">
                    <Progress value={86} color="success" style={{ height: "3px" }}></Progress>
                  </Col>
                  <Col xs="4" className="text-center text-muted">
                    86
                  </Col>
                </div>
              </td>
            </tr>
            <tr>
              <td>Glossy Tee</td>
              <td>200</td>
              <td>$400.00</td>
              <td>
                <div className="d-flex justify-content-center align-items-center">
                  <Col xs="8">
                    <Progress value={35} color="warning" style={{ height: "3px" }}></Progress>
                  </Col>
                  <Col xs="4" className="text-center text-muted">
                    35
                  </Col>
                </div>
              </td>
            </tr>
          </tbody>
        </Table>
      </Row>
    </>
  );
}

export default Dashboard;
