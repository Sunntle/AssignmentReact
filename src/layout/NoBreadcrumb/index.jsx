import Footer from "components/Footer";
import Header from "components/Header";
import ScrollToTop from "components/ScrollToTop";
import "../Default/DefaultLayout.scss";
import ToastMessage from "components/Toast";
import {  useLayoutEffect } from "react";
import { Helmet } from "react-helmet";
import { handleTextCapitalize } from "utils/helper";
import { useLocation } from "react-router-dom";

function NoBreadcrumb({ children }) {
  const location = useLocation()

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <div className="wrapper position-relative">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{handleTextCapitalize(location.pathname === "/" || location.pathname === "/home" ?"home": "detail")}</title>
      </Helmet>
      <ToastMessage />
      <Header />
      <div className="content position-relative min-vh-100">{children}</div>
        <Footer />
      <ScrollToTop />
    </div>
  );
}

export default NoBreadcrumb;
