import { useState } from "react";
import { Link } from "react-router-dom";
import { Image, Button } from "react-bootstrap";

import { HanddleLogout, Userdata } from "../../services/api";

const assets = ["https://greenwallet-team.github.io/assets/new-images/men.jpg",
  "https://greenwallet-team.github.io/assets/new-images/woman.jpg",
  "https://greenwallet-team.github.io/assets/new-images/astro_pfp.jpg",
  "https://greenwallet-team.github.io/assets/images/logo.png",
];


function DashboardSideBar() {
  const [sidebarBtn, closeSidebarBtn] = useState("bx bx-menu");
  const [sidebar, setSidebar] = useState("sidebar");

  let userdata = Userdata()

  const openSidebar = () => {
    if (sidebar === "sidebar") {
      setSidebar("sidebar open");
      closeSidebarBtn("bx bx-x");
    } else {
      setSidebar("sidebar");
      closeSidebarBtn("bx bx-menu");
    }
  }

  return (
    <>
      <div className={sidebar}>
        <div className="logo-details">
          <Image className="imgSideBar icon" src={assets[3]} />
          <i className={sidebarBtn} id="btn" onClick={openSidebar} />
        </div>
        <ul className="nav-list">
          <li>
            <Link to="/dashboard/panel">
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
            <Link to="/dashboard/history">
              <i className="bx bx-history"></i>
              <span className="links_name">Histórico</span>
            </Link>
            <span className="tooltip">Histórico</span>
          </li>
          <li>
            <Link to="/dashboard/quotation">
              <i className="bx bx-dollar"></i>
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
              <Image src={assets[userdata.gender]} alt="profileImg" />
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
