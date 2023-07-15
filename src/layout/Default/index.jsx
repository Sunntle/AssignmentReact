import BreadcrumbComponent from "components/Breadcrumb";
import Footer from "components/Footer";
import Header from "components/Header";
import ScrollToTop from "components/ScrollToTop";

import "./DefaultLayout.scss";

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
