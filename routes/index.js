const express = require('express');

const router = express.Router();

const homeController =require('../controllers/home_controller');

console.log("router loaded");

//requests to /'' are sent to their respective controllers
router.get('/',homeController.home);

router.use('/users',require('./users'));

//router.use('/routerName',require('./routerfile));

module.exports = router;