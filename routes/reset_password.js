const express = require('express');

const router = express.Router();
const resetPasswordController = require('../controllers/reset_password_controller');

// router.get('/email',resetPasswordController.renderEmailForm);
router.get('/',resetPasswordController.renderEmailForm);
router.post('/email',resetPasswordController.validateUser);
router.get('/access-token/:token',resetPasswordController.renderResetPasswordForm);
router.post('/update-password',resetPasswordController.ResetPassword);

module.exports = router;