const Campaign = require('../models/campaignModel');

const RequestCampaign = async (req, res) => {
    // console.log("Hello, I'm at RequestCampaign");

    try {
        // Extract data from the form
        const { campaignName, goalAmount, description, contactNumber ,buildingNo, pincode,city,state } = req.body;
        const imageUrls = req.filesDownloadURLs || []; // Extracting multiple image URLs

        // console.log("Campaign Name:", campaignName);
        // console.log("Goal Amount:", goalAmount);
        // console.log("Description:", description);
        // console.log("Contact Number:", contactNumber);
        // console.log("Image URLs:", imageUrls);
        console.log("City:", city);

        // Create a new Campaign instance
        const newCampaign = new Campaign({
            campaignName,
            goalAmount,
            description,
            contactNumber,
            city,
            images: imageUrls,
            buildingNo,
            pincode,
            state
             // Assigning multiple image URLs
        });

        // Save the new campaign to the database
        const savedCampaign = await newCampaign.save();
        res.status(201).json(savedCampaign); // Respond with the saved campaign data
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to create campaign' }); // Handle error
    }
};

const campaignDetails = async (req, res) => {
    // console.log("details of campaign");
    const { campaignId } = req.params;

    try {
        // console.log("campaignId=" + campaignId);
        const campaign = await Campaign.findById(campaignId);
        // console.log("campaign=" + campaign);
        if (!campaign) {
            return res.status(404).json({ error: 'Campaign not found' });
        }
        res.json(campaign);
    } catch (error) {
        console.error('Error fetching campaign:', error);
        res.status(500).json({ error: 'Failed to fetch campaign details' });
    }
};
const campaignApprove=async(req,res)=>{
    const { campaignId } = req.params;

    try {
      // Fetch the campaign from the database
      const campaign = await Campaign.findById(campaignId);
  
      if (!campaign) {
        return res.status(404).json({ error: 'Campaign not found' });
      }
  
      // Update the campaign status to "approved"
      campaign.status = 'approved';
      
      // Save the updated campaign
      await campaign.save();
  
      // Send a success response
      res.json({ message: 'Campaign approved successfully' });
    } catch (error) {
      console.error('Error approving campaign:', error);
      res.status(500).json({ error: 'Failed to approve campaign' });
    }
}
const campaignDelete=async(req,res)=>{
    const { campaignId } = req.params;

    try {
      // Find the campaign by ID and delete it
      const deletedCampaign = await Campaign.findByIdAndDelete(campaignId);
  
      if (!deletedCampaign) {
        // If the campaign with the specified ID doesn't exist, return 404
        return res.status(404).json({ error: 'Campaign not found' });
      }
  
      // If the campaign is successfully deleted, return success message
      res.json({ message: 'Campaign deleted successfully' });
    } catch (error) {
      // If an error occurs during deletion, return 500 with error message
      console.error('Error deleting campaign:', error);
      res.status(500).json({ error: 'Failed to delete campaign' });
    }
}

const getByCity = async (req , res) => {
  try {
    const { city } = req.body;
    const campaigns = await Campaign.find({ city });
    if(!campaigns){
      return res.status(404).json({
        success:false,
        error:'Campaigns Not Found',
        message:'No campaign in the given city found'
      })
    }
    res.json(campaigns);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { RequestCampaign, campaignDetails,campaignApprove,campaignDelete , getByCity };
