import React from "react";
import { Link } from "react-router-dom";
import { Container } from "reactstrap";

function ErrorPage() {
  return (
    <Container
      style={{ display: "grid", placeItems: "center", minHeight: "100vh" }}
    >
      <div>
        <div>
          <img
            className="img-fluid"
            src="https://vaxim-ng.envytheme.com/assets/img/error.png"
            alt=""
          />
        </div>
        <h2 className="text-capitalize my-3">Ops! Something's wrong</h2>
        <p className="text-muted my-3 py-3">
          The page is under development
        </p>
        <Link
          to="/"
          className="btn btn-dark py-2 px-3 text-decoration text-light"
        >
          Home
        </Link>
      </div>
    </Container>
  );
}

export default ErrorPage;
