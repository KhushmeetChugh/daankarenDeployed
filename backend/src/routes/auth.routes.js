const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const multer = require("multer");
const { initializeApp } = require("firebase/app");
const authController = require("../controllers/authController");
const campaignController = require("../controllers/campaignController");
const firebaseConfig = require("../config/firebase-config");
initializeApp(firebaseConfig);
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const campaignRouter = require('../routes/pendingCampaigns');
const campaignRouterApproved = require('../routes/approvedCampaigns');
const contactController = require('../controllers/contactController')
const donationController=require('../controllers/donationController')
const partnerController = require('../controllers/partnerController');
const cookieParser = require('cookie-parser');
const itemDonateRouter = require('../routes/pendingItemDonation');
const approvedItemDonations = require('../routes/approvedItemDonation');
const router=express.Router();

var braintree = require("braintree");
const donation=require('../models/donationsModel');
const { itemsDonationRequest, deleteDonationRequest, approveDonationRquest } = require("../controllers/itemDonationController");
const { registerOrg, deleteRegistrationRequest,approveRegistrationRequest,getPendingRegistrations} = require("../controllers/ngoController");
const { handleRides, getRidesVolunteered, getRidesCompleted, getRidesInitiated, handlePick, handleDelivery, handleSeen } = require("../controllers/riderController");

var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "shq9mzng2k4xykmj",
  publicKey: "yj4fdxxws9yw4gdv",
  privateKey: "91b6df0d5ae42e8649bf214edf7a9491",
});





router.post("/signup", authController.signup);
router.post("/contact", contactController.submitForm);
router.post("/RequestCampaign",upload.array('files'),authController.uploadMiddleware,campaignController.RequestCampaign);
router.use('/campaigns', campaignRouter);
router.use('/campaigns', campaignRouterApproved);
// app.post('/signup', upload.single('files') , authController.addressImage, authController.signup);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/campaigns/:campaignId',campaignController.campaignDetails);
router.post('/campaigns/:campaignId/approve',campaignController.campaignApprove);
router.delete('/campaigns/:campaignId',campaignController.campaignDelete);
router.post('/braintree/payment',donationController.payment)
router.get('/braintree/token',donationController.paymentToken);
router.post('/city' , campaignController.getByCity );
router.get('/partners/brands', partnerController.getBrandPartners);
router.get('/partners/org', partnerController.getOrgPartners);
router.get('/fetchCampaignsOfUser/:userId',campaignController.fetchCampaignsOfUser)
router.get('/fetchDonatedCampaigns/:userId',campaignController.fetchDonatedCampaigns)
router.get('/fetchUserDetails',authController.fetchUserDetails)

router.post('/itemsDonationRequest' , authController.verifyToken , itemsDonationRequest );
router.delete('/itemsDonationRequest/delete/:donationID' , deleteDonationRequest);
router.put('/itemsDonationRequest/approve/:donationID' , approveDonationRquest);
router.use('/itemDonations' , itemDonateRouter );
router.use('/itemDonations' , approvedItemDonations );
//for ngo registration
router.get('/registerOrg/pending', getPendingRegistrations);
router.post('/registerOrg' , registerOrg);
router.delete('/registerOrg/delete/:registrationID' , deleteRegistrationRequest);
router.put('/registerOrg/approve/:registrationID' , approveRegistrationRequest);

// for volunteers
router.post('/volunteerSelf' , authController.verifyToken , handleRides );
router.get('/volunteeredRides/:userId' , getRidesVolunteered);
router.get('/completedRides/:userId' , getRidesCompleted);
router.get('/initiatedRides/:userId' , getRidesInitiated);
router.put('/handlePick/:rideId' , handlePick);
router.post('/handleDelivery/:rideId' , upload.single('files') , authController.addressImage , handleDelivery );

router.post('/handleProfile/:userId' , upload.single('files') , authController.addressImage , authController.handleProfile );

router.put('/handleSeen/:rideId' , handleSeen);

router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

//verifyng otp
router.post('/send-otp',authController.sendOtp);
router.post('/verify-otp',authController.verifyOtp);
router.post('/change-password',authController.changePassword);
module.exports=router;