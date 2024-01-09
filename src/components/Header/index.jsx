import {
  faBars,
  faCartShopping,
  faHeart,
  faMagnifyingGlass,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Images from "assets/images/logo.png";
import { forwardRef, useCallback, useLayoutEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button, Col, Container, Input, Nav, Row, UncontrolledTooltip } from "reactstrap";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "redux/user/userSlice";
import { showToast } from "redux/toast/toastSlice";
const Header = forwardRef((props, ref) => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartReducer);
  const user = useSelector((state) => state.userReducer);
  const isLogin = user.isAuthenticated;
  const navigate = useNavigate();
  const wishlist = useSelector(state => state.wishlistReducer)

  useLayoutEffect(() => {
    const navsub = document.querySelectorAll(".navsub");
    const showNav = document.querySelector(".showNav");
    const handleClick = (e) => {
      e.preventDefault();
      navsub.forEach((el) => {
        el.classList.toggle("d-none");
      });
    };
    showNav.addEventListener("click", handleClick);
    return () => {
      showNav.removeEventListener("click", handleClick);
    };
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("idToken");
    localStorage.removeItem("expiresAt");
    dispatch(logOut());
    dispatch(showToast({ type: "success", message: "Log out successfully!" }));
    navigate("/");
  },[dispatch, navigate]);

  const handleSearch = useCallback(() => {
    navigate("/shop", { state: { kw: search.trim() } });
    setSearch("");
  },[navigate, search]);

  const handleLinkAccount = useCallback(() => {
    if (isLogin)
      return (
        <>
          <Link to="/account" className="text-decoration-none text-white">
            <span className="px-2 logOut-icon">Hi, {user?.user?.username}</span>
          </Link>
          <FontAwesomeIcon
            className="logOut-icon"
            icon={faRightFromBracket}
            onClick={handleLogout}
            id="UncontrolledTooltipExample"
          />
          <UncontrolledTooltip placement="bottom" target="UncontrolledTooltipExample">
            Log out
          </UncontrolledTooltip>
        </>
      );
    else
      return (
        <Link to="/account" className="text-decoration-none text-white px-2">
          <span className="logOut-icon">Sign In</span>
        </Link>
      );
  },[handleLogout, isLogin, user?.user?.username]);

  return (
    <header ref={ref} className="bg-light">
      <div className="header__top bg-dark">
        <Container>
          <div className="text-white align-items-center p-2 d-none d-md-flex">
            <Col lg="6" md="7">
              <p className="m-0">Free shipping, 30-day money-back or exchange guarantee...</p>
            </Col>
            <Col lg="6" md="5">
              <div className="header__top__right text-end">
                {handleLinkAccount()}
                <Link className="text-decoration-none text-uppercase text-white px-2">FAQs</Link>
              </div>
            </Col>
          </div>
        </Container>
      </div>
      <Container>
        <Row className="align-items-center justify-content-center">
          <Col lg="2" xs="6">
            <div className="header__logo py-2">
              <img className="img-fluid" src={Images} alt="Logo" />
            </div>
          </Col>
          <Col xs="6" className="d-lg-none text-end">
            <Link href="#" className="text-decoration-none text-dark showNav fs-3 p-3">
              <FontAwesomeIcon icon={faBars} />
            </Link>
          </Col>
          <Col lg="7" className="d-none d-lg-block text-start navsub">
            <Nav className="header__menu d-lg-flex justify-content-center  d-inline-block">
              <NavLink
                className="fs-5 fw-semibold text-black nav-link home"
                exact="true"
                activeclassname="active"
                to="/"
              >
                Home
              </NavLink>
              <NavLink
                className=" fs-5 fw-semibold text-black nav-link shop"
                exact="true"
                activeclassname="active"
                to="/shop"
              >
                Shop
              </NavLink>
              <div className="menu-lv1 position-relative">
                <NavLink className="fs-5 fw-semibold text-black nav-link page exclude">
                  Pages
                </NavLink>          
                <Nav className="menu-lv2 bg-black rounded">
                  <NavLink className=" text-light nav-link" exact="true" to="/policy">
                    Policy
                  </NavLink>
                  <NavLink className=" text-light nav-link" exact="true" to="/contact">
                    Contact
                  </NavLink>
                </Nav>
              </div>
              <NavLink
                className=" fs-5 fw-semibold text-black nav-link blog"
                exact="true"
                activeclassname="active"
                to="/about"
              >
                About
              </NavLink>
              <div className="menu-lv1 position-relative">
                <NavLink className=" fs-5 fw-semibold text-black nav-link page" activeclassname="active" to={isLogin ? "/profile" :"/account"}>
                  Account
                </NavLink>
                {isLogin && <Nav className="menu-lv2 bg-black rounded">
                  {user.user.role === 1 && (
                    <NavLink className=" text-light nav-link" exact="true" to="/admin">
                      Admin
                    </NavLink>
                  )}
                  <NavLink className="text-light nav-link text-nowrap" exact="true" to="/orders">
                    Orders
                  </NavLink>
                </Nav>}
                
              </div>
            </Nav>
          </Col>
          <Col lg="3" className="d-none d-lg-block navsub">
            <div className="header__icon d-flex p-lg-0 px-3 py-2 align-items-center">
              <div className="position-relative">
              <Input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
              <Button onClick={handleSearch} className="top-50 end-0 position-absolute p-1 bg-transparent translate-middle border-0" type="submit">
                <FontAwesomeIcon icon={faMagnifyingGlass} color="#6c757d" />
              </Button>
              </div>
              <div className="wrap-cart-icon overflow-visible d-inline-flex justify-content-center align-items-center">
                <Link to="/favorites" className="position-relative">
                  <FontAwesomeIcon className="text-black" icon={faHeart} />
                  <div className="position-absolute countProduct fs-6 fw-bolder">
                    {wishlist.list.length}
                  </div>
                </Link>
              </div>
              <div className="wrap-cart-icon overflow-visible d-inline-flex justify-content-center align-items-center">
                <Link to={"/cart"} className="position-relative">
                  <FontAwesomeIcon className="text-black" icon={faCartShopping} />
                  <div className="position-absolute countProduct fs-6 fw-bolder">
                    {cart.reduce((acc, cur) => acc + cur.quantity, 0)}
                  </div>
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </header>
  );
});
export default Header;
