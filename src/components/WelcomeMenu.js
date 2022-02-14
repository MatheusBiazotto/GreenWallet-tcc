import { Link } from "react-router-dom";
import { Navbar, Form, Nav, Button, Image } from "react-bootstrap";

const assets = [
  "https://greenwallet-team.github.io/assets/images/whitelogo.png",
];

const WelcomeMenu = () => (
  /*   const [mobileStyle, setMobileStyle] = useState("menu-dropdown");

  function Dropdown() {
    if (mobileStyle === "menu-dropdown") {
      setMobileStyle("menu-dropdown active");
    } else if (mobileStyle === "menu-dropdown active") {
      setMobileStyle("menu-dropdown deactive");
      setTimeout(setDefaultState, 500);
    } else if (mobileStyle === "menu-dropdown deactive") {
      setMobileStyle("menu-dropdown active");
    }

    function setDefaultState() {
      setMobileStyle("menu-dropdown");
    }
  } */
  <Navbar id="nav" expand="md" variant="dark">
    <Navbar.Brand>
      <Link to="/">
        <Image
          className="d-inline-block align-top"
          src={assets[0]}
          alt="logo.png"
          width="147"
        />
      </Link>
    </Navbar.Brand>
    <Navbar.Toggle
      className="nav-collapse-icon"
      aria-controls="basic-navbar-nav"
    />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Item>
          <Link className="link">Produtos</Link>
        </Nav.Item>
        <Nav.Item>
          <Link className="link">Sobre</Link>
        </Nav.Item>
        <Nav.Item>
          <Link className="link">Contato</Link>
        </Nav.Item>
      </Nav>
      <Form inline>
        <Link to="/login">
          <Button className="nav-button" variant="success">
            Entrar
          </Button>
        </Link>
        <span className="nav-text">ou</span>
        <Link to="/register">
          <Button className="nav-button" variant="success">
            Crie sua Conta
          </Button>
        </Link>
      </Form>
    </Navbar.Collapse>
  </Navbar>
);

export default WelcomeMenu;
