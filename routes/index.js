const express = require('express');

const router = express.Router();

const homeController =require('../controllers/home_controller');



console.log("router loaded");

//requests to /'' are sent to their respective controllers
router.get('/',homeController.home);

//since we are making requests to users middleware i.e users/profile and all 
router.use('/users',require('./users'));





module.exports = router;