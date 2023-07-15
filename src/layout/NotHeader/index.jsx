import NavbarAdmin from "components/Admin/Navbar";
import { Col, Container, Row } from "reactstrap";

function NotHeaderLayout({ children }) {
  return (
    <Container fluid>
      <Row className="wrap-admin">
        <Col xs="2" className="position-relative shadow">
          <div className="wrap-navbar-admin sticky-top">
            <NavbarAdmin />
          </div>
        </Col>
        <Col xs="10" className="px-5 pb-5">
          {children}
        </Col>
      </Row>
    </Container>
  );
}

export default NotHeaderLayout;
