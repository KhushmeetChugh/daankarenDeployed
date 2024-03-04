import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navcomp from "./components/Navbar";
import HomePage from "./components/HomePage";
import Footer from './components/Footer';
import DonationPage from './components/DonationPage';
import CampaignsPage from './components/CampaignPage';
import ContactPage from './components/ContactPage';
import PartnerPage from './components/PartnerPage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import PendingTickets from './components/PendingTickets';
import ViewCampaigns from './components/ViewCampaigns';
import NewCampaign from './components/NewCampaign';
import CampaignCard from './components/CampaignCard';
import CampaignPage from './components/CampaignPage';
function App() {
  return (
    <>
      <Router>
        <Navcomp />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/DonationPage" element={<DonationPage />} />
          <Route path="/CampaignsPage" element={<CampaignsPage />} />
          <Route path="/ContactPage" element={<ContactPage />} />
          <Route path="/NewCampaign" element={<NewCampaign />} />
          <Route path="/PartnerPage" element={<PartnerPage />} />
          <Route path="/LoginPage" element={<LoginPage />} />
          <Route path="/SignupPage" element={<SignupPage />} />
          <Route path="/PendingTickets" element={<PendingTickets />} />
          <Route path="/CampaignCard" element={<CampaignCard />} />
          <Route path="/campaigns/:campaignId" element={<CampaignPage />} />
          <Route path="/ViewCampaigns" element={<ViewCampaigns />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
