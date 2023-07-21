import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container } from "reactstrap";

function Unauthorized() {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);
  return (
    <Container className="mx-auto py-5">
      <div>
        <img className="img-fluid" src="https://vaxim-ng.envytheme.com/assets/img/error.png" alt="" />
      </div>
      <h2 className="text-capitalize my-3">Unauthorized</h2>
      <p className="text-muted my-3 py-3">You do not have access to the requested this page</p>
      <Button onClick={goBack} color="dark" className="py-2 px-3 text-decoration text-light">
        Go back
      </Button>
    </Container>
  );
}

export default Unauthorized;
