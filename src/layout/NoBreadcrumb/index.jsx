import Footer from "components/Footer";
import Header from "components/Header";
import ScrollToTop from "components/ScrollToTop";
import "../Default/DefaultLayout.scss";

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
