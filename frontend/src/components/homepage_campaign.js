import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router
import '../CSS/homepage.css';
import { useState,useEffect } from 'react';
import CampaignCard from "./CampaignCard";

const HomepageCampaign = () => {
  const [campaigns,setCampaigns]=useState(null);


    
  useEffect(() => {
    async function fetchAllCampaigns() {
      try {
        const res = await fetch("http://localhost:4000/campaigns/approved");
        const data = await res.json();
        console.log("data"+data)
        // setLoadingPercentage(70);
        setCampaigns(data.slice(0,4));
        if (res.ok) {

          // setLoadingPercentage(100);
        } else {
          console.error("Error fetching all campaigns:", data.error);
          // setLoadingPercentage(100);
        }
      } catch (error) {
        console.error(error);
        console.log("An Error occurred while fetching all campaigns");
        // setLoadingPercentage(100);
      }
      console.log(campaigns);
    }
    // setLoadingPercentage(10);
    console.log("imh")    
    fetchAllCampaigns(); 
    console.log("imhere")
  }, []);

  return (
    <div className="homepage-campaign-section">
      <div className="section-heading">
        <h2 className="section-title">Featured Campaigns</h2>
        <div className="heading-decoration"></div>
      </div>
      <div className="campaign-cards-container">
      {campaigns ? campaigns.map(campaign => (                   <CampaignCard
                    key={campaign._id}
                    campaign={campaign}
                    role={"user"}
                  />)) : <p>Loading...</p>}

      </div>
      <div className='homepage-see-more-campaign'>
        <Link to="/ViewCampaigns" className="view-all-btn">
          See More {'>'}
        </Link>
      </div>
    </div>
  );
};

export default HomepageCampaign;