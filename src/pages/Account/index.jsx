import { useState } from "react";
import { Col, Container, Nav, NavItem, NavLink, Row, TabContent, TabPane } from "reactstrap";
import "./SignInStyle.scss";

import LoginComponent from "./Login";
import Register from "./Register";
import ForgotPass from "./ForgotPass";
function SignIn() {
  const [activeTab, setActiveTab] = useState("1");

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  return (
    <Container className="signin">
      <Row>
        <Col xs="12" md="7" className="mx-auto mt-3">
          <Nav className="justify-content-center mb-4">
            {activeTab !== "3" ? (
              <>
                <NavItem>
                  <NavLink className={activeTab === "1" ? "active" : ""} onClick={() => toggleTab("1")}>
                    <h2>Login</h2>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className={activeTab === "2" ? "active" : ""} onClick={() => toggleTab("2")}>
                    <h2>Register</h2>
                  </NavLink>
                </NavItem>
              </>
            ) : (
              <NavItem className="custom-scss">
                <NavLink className={activeTab === "3" ? "active" : ""}>
                  <h2>Reset account password</h2>
                </NavLink>
              </NavItem>
            )}
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1" className="p-5">
              <LoginComponent toggleTab={toggleTab} />
            </TabPane>
            <TabPane tabId="2" className="p-5">
              <Register />
            </TabPane>
            <TabPane tabId="3" className="p-5">
              <ForgotPass toggleTab={toggleTab} />
            </TabPane>
          </TabContent>
        </Col>
      </Row>
    </Container>
  );
}

export default SignIn;
