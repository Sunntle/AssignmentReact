import Footer from "components/Footer";
import Header from "components/Header";
import ScrollToTop from "components/ScrollToTop";
import "../Default/DefaultLayout.scss";
import ToastMessage from "components/Toast";

function NoBreadcrumb({ children }) {
  return (
    <div className="wrapper position-relative">
      <ToastMessage />
      <header>
        <Header />
      </header>
      <div className="content position-relative">{children}</div>
      <footer>
        {" "}
        <Footer />
      </footer>
      <ScrollToTop />
    </div>
  );
}

export default NoBreadcrumb;
