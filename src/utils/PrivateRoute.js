import { Outlet, Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { isTokenExpired } from "./auth";
const PrivateRoute = ({ allowedRoles }) => {
  const idToken = localStorage.getItem("idToken");
  const role = localStorage.getItem("role");
  let location = useLocation();
  return idToken && !isTokenExpired() ? (
    allowedRoles.find((el) => el === role) ? (
      <Outlet />
    ) : (
      <Navigate to="/unauthorized" state={{ from: location }} replace />
    )
  ) : (
    <Navigate to="/account" state={{ from: location }} replace />
  );
};
export default PrivateRoute;
