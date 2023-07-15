import React from "react";
import { Spinner } from "reactstrap";

function LoadingComponent() {
  return (
    <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
      <Spinner color="danger"></Spinner>
    </div>
  );
}

export default LoadingComponent;
