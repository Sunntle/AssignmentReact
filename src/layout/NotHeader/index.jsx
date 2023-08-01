import NavbarAdmin from "components/Admin/Navbar";
import ToastMessage from "components/Toast";

import { useEffect } from "react";
import { Col, Container, Row } from "reactstrap";

function NotHeaderLayout({ children }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <Container fluid className="position-relative">
      <ToastMessage />
      <Row className="wrap-admin">
        <Col xs="4" lg="2" className="position-relative shadow">
          <div className="wrap-navbar-admin sticky-top">
            <NavbarAdmin />
          </div>
        </Col>
        <Col xs="8" lg="10" className="px-5 pb-5">
          {children}
        </Col>
      </Row>
    </Container>
  );
}

export default NotHeaderLayout;
