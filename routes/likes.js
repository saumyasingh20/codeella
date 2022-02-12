const express = require('express');
const router = express.Router();
const likesControler = require('../controllers/likes_controller');

router.post('/toggle',likesControler.toggleLike);

module.exports = router;