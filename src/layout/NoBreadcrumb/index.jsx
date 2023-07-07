import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "../Default/DefaultLayout.scss";
import ScrollToTop from "../../components/ScrollToTop";
function NoBreadcrumb({ children }) {
  return (
    <div className="wrapper position-relative">
      <header>
        <Header />
      </header>
      <div className="content">{children}</div>
      <footer>
        {" "}
        <Footer />
      </footer>
      <ScrollToTop />
    </div>
  );
}

export default NoBreadcrumb;
