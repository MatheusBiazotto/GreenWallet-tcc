import { useLocation } from "react-router-dom"
import { useState } from "react";
import { Link } from "react-router-dom";
import { Image, Button } from "react-bootstrap";
import { HanddleLogout, Userdata } from "../services/api";

const assets = ["https://greenwallet-team.github.io/assets/images/logo.png"];

const nonActivePage = {}

function DashboardSideBar() {
  const [sidebarBtn, closeSidebarBtn] = useState("bx bx-menu");
  const [sidebar, setSidebar] = useState("sidebar");

  const [ipanel, setipanel] = useState({});

  const openSidebar = () => {
    if (sidebar === "sidebar") {
      setSidebar("sidebar open");
      closeSidebarBtn("bx bx-x");
    } else {
      setSidebar("sidebar");
      closeSidebarBtn("bx bx-menu");
    }
  }

  let panelPage = useLocation().pathname

  let userdata = Userdata()

  function activePageStyle() {
    switch (panelPage) {
      case "dashboard/panel":
        return setipanel({ color: "var(--white)", background: "var(--purple)"})

    
      default:
        return nonActivePage;
    }
  }

  activePageStyle()

  return (
    <>
      <div className={sidebar}>
        <div className="logo-details">
          <Image className="imgSideBar icon" src={assets[0]} />
          <i className={sidebarBtn} id="btn" onClick={openSidebar} />
        </div>
        <ul className="nav-list">
          <li>
            <Link style={ipanel} to="/dashboard/panel">
              <i className="bx bx-grid-alt"></i>
              <span className="links_name">Painel</span>
            </Link>
            <span className="tooltip">Painel</span>
          </li>
          <li>
            <Link to="/dashboard/wallet">
              <i className="bx bx-pie-chart-alt-2"></i>
              <span className="links_name">Movimentações</span>
            </Link>
            <span className="tooltip">Movimentações</span>
          </li>
          <li>
            <Link to="/dashboard/objectives">
              <i className="bx bx-calendar-check"></i>
              <span className="links_name">Metas</span>
            </Link>
            <span className="tooltip">Metas</span>
          </li>
          <li>
            <Link to="/dashboard/quotation">
              <i className="bx bx-dollar-circle"></i>
              <span className="links_name">Cotação de Moedas</span>
            </Link>
            <span className="tooltip">Cotação de Moedas</span>
          </li>
          <li>
            <Link to="/dashboard/settings">
              <i className="bx bx-cog"></i>
              <span className="links_name">Configurações</span>
            </Link>
            <span className="tooltip">Configurações</span>
          </li>
          <li className="profile">
            <div className="profile-details profile-overflow">
              <Image src="profile.jpg" alt="profileImg" />
              <div className="name_job">
                <div className="name">{userdata.name}</div>
                <div className="job">{userdata.surname}</div>
              </div>
            </div>
            <Button onClick={HanddleLogout}>
              <i className="bx bx-log-out" id="log_out"  />
            </Button>
            <span className="tooltip">Logout</span>
          </li>
        </ul>
      </div>
    </>
  );
}

export default DashboardSideBar;
