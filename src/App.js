import { Routes, Route } from "react-router-dom";
import publicRoutes from "./routes";
import "./App.css";
import { Fragment } from "react";
function App() {
  return (
    <div className="App">
      <Routes>
        {publicRoutes.map((route, index) => {
          let Layout = route.layout
          if (route.layout) {
            Layout = route.layout;
          } else  {
            Layout = Fragment;
          }
          const Page = route.component;
          return (
            <Route
              path={route.path}
              element={<Layout><Page /></Layout>}
              key={index}
            ></Route>
          );
        })}
      </Routes>
    </div>
  );
}

export default App;
