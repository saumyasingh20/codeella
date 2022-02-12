const express = require('express');

const router = express.Router();

const homeController =require('../controllers/home_controller');



console.log("router loaded");

//requests to /'' are sent to their respective controllers
router.get('/',homeController.home);


//since we are making requests to users middleware i.e users/profile and all 
router.use('/users',require('./users'));

router.use('/posts',require('./posts'));

router.use('/comments',require('./comments'));

router.use('/api',require('./api'));

router.use('/reset-password',require('./reset_password'));

router.use('/likes',require('./likes'));


module.exports = router;