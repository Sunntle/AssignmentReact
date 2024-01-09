import React from "react";
import { Link } from "react-router-dom";
import { Container } from "reactstrap";

function NotFound() {
  return (
    <Container style={{ display: "grid", placeItems: "center", minHeight: "100vh" }}>
      <div>
      <div>
        <img className="img-fluid" src="https://vaxim-ng.envytheme.com/assets/img/error.png" alt="" />
      </div>
      <h2 className="text-capitalize my-3"> Page not found</h2>
      <p className="text-muted my-3 py-3">The page you are looking for has been removed or does not exist</p>
      <Link to="/" className="btn btn-dark py-2 px-3 text-decoration text-light">
        Home
      </Link>
      </div>
    </Container>
  );
}

export default NotFound;
