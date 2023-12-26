import BreadcrumbComponent from "components/Breadcrumb";
import Footer from "components/Footer";
import Header from "components/Header";
import ScrollToTop from "components/ScrollToTop";

import "./DefaultLayout.scss";
import ToastMessage from "components/Toast";
import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import { handleTextCapitalize } from "utils/helper";

function DefaultLayout({ children }) {
  const location = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div className="wrapper position-relative">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{handleTextCapitalize(location.pathname)}</title>
      </Helmet>
      <ToastMessage />
      <Header />
      <div className="content min-vh-100">
        <BreadcrumbComponent />
        <div className="m-3 p-3">{children}</div>
      </div>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default DefaultLayout;
