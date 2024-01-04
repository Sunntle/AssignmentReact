import React from "react";
import { Spinner } from "reactstrap";

function LoadingComponent({children, isLoading = false}) {
  if(!isLoading && children) return children 
  if (children) {
    return (
      <div className="d-flex flex-column gap-3 align-items-center justify-content-center">
        <Spinner color="danger"></Spinner>
        <h5>Loading...</h5>
      </div>
    );
  }
  return (
    <div style={{ height: "800px" }}>
      <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
        <Spinner color="danger"></Spinner>
      </div>
    </div>
  );
}

export default LoadingComponent;
