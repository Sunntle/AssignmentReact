import { Button, Container, Table } from "reactstrap";
import "./ProductAdminStyle.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
function ProductAdmin() {
  return (
    <Container fluid className="pt-5 wrap-admin-product">
      <h2 className="title pb-5 m-0">List Product</h2>
      <Table responsive hover>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Type Product</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="text-center">
          <tr>
            <td style={{ maxWidth: "100px" }}>
              <img
                className="img-fluid"
                src="https://flone.jamstacktemplates.dev/assets/img/product/fashion/8.jpg"
                alt="img"
              />
            </td>
            <td>Jacket Bracker Cheat</td>
            <td>200000</td>
            <td>Jacket</td>
            <td>20-08-2023</td>
            <td>
              <Button outline color="info">
                <FontAwesomeIcon icon={faPenToSquare} />
              </Button>
              <Button outline color="danger">
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </td>
          </tr>
          <tr>
            <td style={{ maxWidth: "100px" }}>
              <img
                className="img-fluid"
                src="https://flone.jamstacktemplates.dev/assets/img/product/fashion/8.jpg"
                alt="img"
              />
            </td>
            <td>Jacket Bracker Cheat</td>
            <td>200000</td>
            <td>Jacket</td>
            <td>20-08-2023</td>
            <td>
              <Button outline color="info">
                <FontAwesomeIcon icon={faPenToSquare} />
              </Button>
              <Button outline color="danger">
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </td>
          </tr>
          <tr>
            <td style={{ maxWidth: "100px" }}>
              <img
                className="img-fluid"
                src="https://flone.jamstacktemplates.dev/assets/img/product/fashion/8.jpg"
                alt="img"
              />
            </td>
            <td>Jacket Bracker Cheat</td>
            <td>200000</td>
            <td>Jacket</td>
            <td>20-08-2023</td>
            <td>
              <Button outline color="info">
                <FontAwesomeIcon icon={faPenToSquare} />
              </Button>
              <Button outline color="danger">
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
}

export default ProductAdmin;
