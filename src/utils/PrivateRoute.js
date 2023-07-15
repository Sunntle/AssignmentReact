import { Outlet, Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
const PrivateRoute = () => {
  let auth = { token: true };
  let location = useLocation();
  return auth.token ? <Outlet /> : <Navigate to="/account" state={{ from: location }} replace />;
};
export default PrivateRoute;
