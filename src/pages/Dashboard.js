import { useLocation } from "react-router-dom";
import Panel from "../components/dashboard/DashboardPanel.js";
import Settings from "../components/dashboard/DashboardSettings.js";
import Quotation from "../components/dashboard/DashboardQuotation.js";
import History  from "../components/dashboard/DashboardHistory.js";
import Wallet from "../components/dashboard/DashboardWallet";

import DashboardSideBar from "../components/dashboard/DashboardSideBar.js";

function Dashboard() {
  let pathname = useLocation().pathname;

  function renderPage() {
    switch (pathname) {
      case "/dashboard/panel":
        return <Panel />;

      case "/dashboard/settings":
        return <Settings />;

      case "/dashboard/wallet":
        return <Wallet />;

      case "/dashboard/quotation":
        return <Quotation />;
      
      case "/dashboard/history":
        return <History/>;

      default:
    }
  }

  return (
    <div className="container-expanded" id="dashboard">
      <DashboardSideBar />
      <section className="home-section">
        {renderPage()}
      </section>
    </div>
  );
}

export default Dashboard;
