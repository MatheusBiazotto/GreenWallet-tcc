import { Link } from "react-router-dom";
import { Navbar, Form, Nav, Button, Image } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const assets = [
  "https://greenwallet-team.github.io/assets/new-images/logo.png",
  "https://greenwallet-team.github.io/assets/new-images/whitelogo.png",
];

function ThemeNav() { 
  switch (useLocation().pathname) {
    case "/":
      return "nav-white navbar-light"
    
    case "/login":
      return "nav-green navbar-dark"
    
    case "/register":
      return "nav-green navbar-dark"
    
    default:
  }
}

const WelcomeMenu = () => (
  <Navbar className={ThemeNav()} id="nav" expand="md" >
    <Navbar.Brand>
      <Link to="/">
        <Image
          className="d-inline-block align-top"
          src={useLocation().pathname === "/" ? assets[0] : assets[1]}
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
          <a href="/#product">Produtos</a>
        </Nav.Item>
        <Nav.Item>
          <a href="/#about">Sobre</a>
        </Nav.Item>
        <Nav.Item>
          <a href="/#faq">Contato</a>
        </Nav.Item>
      </Nav>
      <Form inline>
        <Link to="/login">
          <Button className="nav-button" variant="outline-success">
            Entrar
          </Button>
        </Link>
        <span className="nav-text">ou</span>
        <Link to="/register">
          <Button className="nav-button" variant="outline-success">
            Crie sua Conta
          </Button>
        </Link>
      </Form>
    </Navbar.Collapse>
  </Navbar>
);

export default WelcomeMenu;
