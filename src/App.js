import { Routes, Route } from "react-router-dom";
import publicRoutes from "./routes";
import "./App.css";
import { Fragment } from "react";
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
  return (
    <div className="App">
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
      </Routes>
    </div>
  );
}

export default App;
