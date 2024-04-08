import React, { useState, useEffect, useRef } from "react";
import "../CSS/PartnersPage.css";
import orgImage from "../components/Images/tree-736885_1280.jpg";

const PartnersPage = () => {
  const [brandPartners, setBrandPartners] = useState([]);
  const [orgPartners, setOrgPartners] = useState([]);
  const [loadingPercentage, setLoadingPercentage] = useState(0);
  const [selectedOrg, setSelectedOrg] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const brandResponse = await fetch(
          "https://daankarendeployed-1.onrender.com/partners/brands"
        );
        const brandData = await brandResponse.json();
        setLoadingPercentage(20);

        const orgResponse = await fetch("https://daankarendeployed-1.onrender.com/partners/org");
        setLoadingPercentage(40);
        const orgData = await orgResponse.json();

        setBrandPartners(brandData);
        setOrgPartners(orgData);
        setLoadingPercentage(100);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoadingPercentage(100);
      }
    };

    fetchData();
  }, []);

  if (loadingPercentage < 100) {
    return <div>Loading... {loadingPercentage}%</div>;
  }

  const handleOrgClick = (org) => {
    setSelectedOrg(org);
  };

  const closePopup = () => {
    setSelectedOrg(null);
  };
  return (
    <div className="partners-page">
      <div className="partners-section">
        <h2 className="partners-heading">Organisation Partners</h2>
        <div className="org-partners-container">
          {orgPartners.map((partner, index) => (
            <div
              className="partner-card"
              key={index}
              onClick={() => handleOrgClick(partner)}
            >
              <div className="partner-card-border-top">
                <img
                  className="img"
                  src={partner.orgImage}
                  alt={partner.orgName}
                />
              </div>
              <span>{partner.orgName}</span>
              <p>
                {partner.motive.split(" ").slice(0, 25).join(" ")}
                {partner.motive.length > 100 ? "..." : ""}
              </p>
            </div>
          ))}
        </div>
      </div>

      {selectedOrg && (
        <div className="organisation-partner-popup">
          <div className="organisation-partner-popup-container">
            <div className="close-button">
              <span onClick={closePopup}>&times;</span>
            </div>
            <div className="organisation-partner-popup-content">
              <img
                className="img"
                src={selectedOrg.orgImage}
                alt={selectedOrg.orgName}
              />
              <h3>{selectedOrg.orgName}</h3>
              <p>{selectedOrg.email}</p>
              <p>{selectedOrg.address}</p>
              <p>{selectedOrg.contactNumber}</p>
              <p>{selectedOrg.motive}</p>
            </div>
          </div>
        </div>
      )}

      <div className="partners-section">
        <h2 className="partners-heading">Brand Partners</h2>
        <div className="brand-partners">
          {brandPartners.map((partner, index) => (
            <div key={index} className="brand-logo-container">
              <img
                src={partner.logo}
                alt={partner.name}
                className="brand-logo"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PartnersPage;
