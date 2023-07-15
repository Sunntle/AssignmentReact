import { Routes, Route } from "react-router-dom";
import publicRoutes, { privateRoutes } from "./routes";
import "./App.scss";
import { Fragment, useEffect } from "react";
import PrivateRoute from "utils/PrivateRoute";
import { useDispatch, useSelector } from "react-redux";
import { hideToast } from "redux/toast/toastSlice";
import ToastMessage from "components/Toast";
function App() {
  const assignLayout = (route) => {
    let Layout = route.layout;
    if (route.layout) {
      Layout = route.layout;
    } else {
      Layout = Fragment;
    }
    return Layout;
  };
  const toast = useSelector((state) => state.toastReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    const delay = setTimeout(() => {
      dispatch(hideToast());
    }, 2000);
    return () => {
      clearTimeout(delay);
    };
  }, [dispatch, toast.isOpen]);
  return (
    <div className="App position-relative">
      <ToastMessage toast={toast} />
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
                    <Route
                      path="/"
                      element={
                        <Layout>
                          <Page />
                        </Layout>
                      }
                      exact
                    />
                    {route.routes.map((nestedRoute, nestedIndex) => {
                      Layout = assignLayout(nestedRoute);
                      return (
                        <Route
                          key={nestedIndex}
                          path={nestedRoute.path}
                          element={
                            <Layout>
                              <nestedRoute.component />
                            </Layout>
                          }
                        />
                      );
                    })}
                  </Routes>
                }
                key={index}
              />
            );
          }
          // Render non-nested route
          return (
            <Route
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
              key={index}
            />
          );
        })}
        {privateRoutes.map((route, index) => {
          return (
            <Route key={index} path={route.path} element={<PrivateRoute />}>
              {route.routes.map((nestedRoute, nestedIndex) => {
                const Layout = assignLayout(nestedRoute);
                return (
                  <Route
                    key={nestedIndex}
                    path={nestedRoute.path}
                    exact
                    element={
                      <Layout>
                        <nestedRoute.component />
                      </Layout>
                    }
                  />
                );
              })}
            </Route>
          );
        })}
      </Routes>
    </div>
  );
}

export default App;
