import React from "react";
import { Navbar } from "reactstrap";
import Logo from "assets/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBurger, faComment, faHouse, faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import "./NavbarStyle.scss";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
function NavbarAdmin() {
  const user = useSelector((state) => state.userReducer);
  return (
    <div className="navbar-admin">
      <Navbar className="my-3">
        <Link to="/" className="  text-decoration-none fs-5">
          <img className="img-fluid" src={Logo} alt="logo" style={{ maxHeight: "50px" }} />
        </Link>
      </Navbar>
      <Navbar className="my-3">
        <img
          src="https://themedesigner.in/demo/admin-press/assets/images/users/4.jpg"
          className="img-fluid rounded-circle"
          style={{ maxWidth: "80px" }}
          alt="img"
        />
        <div className="d-flex flex-column align-items-start me-4">
          Hi, {user?.user?.name}
          <Link to="/" className="text-decoration-none">
            <FontAwesomeIcon icon={faRightFromBracket} className="pe-2" />
            Log out
          </Link>
        </div>
      </Navbar>
      <Navbar className="my-3">
        <NavLink to="/admin" exact="true" className=" text-decoration-none fs-5" activeclassname="active">
          <FontAwesomeIcon className="pe-3" icon={faHouse} />
          Dashboard
        </NavLink>
      </Navbar>
      <Navbar className="my-3">
        <NavLink to="/admin/product" exact="true" className=" text-decoration-none fs-5" activeclassname="active">
          <FontAwesomeIcon className="pe-3" icon={faBurger} />
          Product
        </NavLink>
      </Navbar>
      <Navbar className="my-3">
        <NavLink to="/admin/user" exact="true" className=" text-decoration-none fs-5" activeclassname="active">
          <FontAwesomeIcon className="pe-3" icon={faUser} />
          User
        </NavLink>
      </Navbar>
      <Navbar className="my-3">
        <NavLink to="/admin/orders" exact="true" className="  text-decoration-none fs-5" activeclassname="active">
          <FontAwesomeIcon className="pe-3" icon={faComment} />
          Orders
        </NavLink>
      </Navbar>
    </div>
  );
}

export default NavbarAdmin;
