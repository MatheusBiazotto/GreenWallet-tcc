import { useLocation } from "react-router-dom";
import { Row, Col, Image } from "react-bootstrap";

import WelcomeMenu from "../components/welcome/WelcomeMenu";
import WelcomeFooter from "../components/welcome/WelcomeFooter";
import FormLogin from "../components/welcome/WelcomeFormLogin";
import FormRegister from "../components/welcome/WelcomeFormRegister";

const assets = [
  "https://greenwallet-team.github.io/assets/new-images/create_account.png",
];

const Register_Login = () => (
  <>
    <div className="container-expand">
      <WelcomeMenu />
      <div className="container-login">
        <Row>
          <Col sm>
            {useLocation().pathname === "/register" ? (
              <Image src={assets[0]} alt="login" id="img-signup" style={{marginTop: "25%"}}  />
            ) : (
              <Image src={assets[0]} alt="login" id="img-signup" />
            )}
          </Col>
          <Col sm>
            <div id="signup-form">
              {useLocation().pathname === "/register" ? (
                <FormRegister />
              ) : (
                <FormLogin />
              )}
            </div>
          </Col>
        </Row>
      </div>
    </div>
    <WelcomeFooter />
  </>
);

export default Register_Login;
