import { Routes, Route } from "react-router-dom";
import publicRoutes, { privateRoutes } from "./routes";
import "./App.scss";
import { Fragment, useEffect } from "react";
import PrivateRoute from "routes/PrivateRoute";
import { useDispatch } from "react-redux";
import { isTokenExpired } from "utils/auth";
import { fetchUserByIdToken } from "redux/user/userSlice";
import { showToast } from "redux/toast/toastSlice";

function App() {
  const dispatch = useDispatch();
  const idToken = localStorage.getItem("idToken");
  useEffect(() => {
    if (idToken && !isTokenExpired()) {
      dispatch(fetchUserByIdToken(idToken));
      dispatch(showToast({ type: "info", message: "Welcome Back!", notification: "Login" }));
    }
  }, [dispatch, idToken]);
  const assignLayout = (route) => {
    let Layout = route.layout;
    if (route.layout) {
      Layout = route.layout;
    } else {
      Layout = Fragment;
    }
    return Layout;
  };
  const renderRoute = (Layout, Page, path, key, exact) => {
    return (
      <Route
        key={key}
        element={
          <Layout>
            <Page />
          </Layout>
        }
        exact={exact ?? false}
        path={path}
      />
    );
  };
  return (
    <div className="App position-relative">
      <Routes>
        {publicRoutes.map((route, index) => {
          let Layout = assignLayout(route);
          const Page = route.component;
          if (route.routes && route.routes.length > 0) {
            return (
              <Route
                path={route.path}
                element={
                  <Routes>
                    {renderRoute(Layout, Page, "/", null, true)}
                    {route.routes.map((nestedRoute, nestedIndex) => {
                      Layout = assignLayout(nestedRoute);
                      return renderRoute(Layout, nestedRoute.component, nestedRoute.path, nestedIndex, false);
                    })}
                  </Routes>
                }
                key={index}
              />
            );
          }
          // Render non-nested route
          return renderRoute(Layout, Page, route.path, index, false);
        })}

        {privateRoutes.map((route, index) => {
          if (!route.routes) {
            const Layout = assignLayout(route);
            const Page = route.component;
            return (
              <Route key={index} element={<PrivateRoute allowedRoles={["0", "1"]} />}>
                {renderRoute(Layout, Page, route.path, null, false)}
              </Route>
            );
          }
          return (
            <Route key={index} path={route.path} element={<PrivateRoute allowedRoles={["1"]} />}>
              {route?.routes &&
                route.routes.map((nestedRoute, nestedIndex) => {
                  const Layout = assignLayout(nestedRoute);
                  const Page = nestedRoute.component;
                  return renderRoute(Layout, Page, nestedRoute.path, nestedIndex, true);
                })}
            </Route>
          );
        })}
      </Routes>
    </div>
  );
}

export default App;
