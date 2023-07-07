import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import BreadcrumbComponent from "../../components/Breadcrumb";
import "./DefaultLayout.scss";
import ScrollToTop from "../../components/ScrollToTop";
function DefaultLayout({ children }) {
  return (
    <div className="wrapper position-relative">
      <header>
        <Header />
      </header>
      <div className="content">
        <BreadcrumbComponent />
        {children}
      </div>
      <footer>
        {" "}
        <Footer />
      </footer>
      <ScrollToTop />
    </div>
  );
}

export default DefaultLayout;
