const express = require('express');
const router = express.Router();
const { signUpController, otpController } = require('../../controllers');
const { validateAuthRequest } = require('../../middleware');

router.post('/signup',validateAuthRequest.validateAuthRequest, signUpController.signUp);
router.post('/signin',validateAuthRequest.validateAuthRequest, signUpController.signIn);
router.post('/forgot-password', otpController.ForgotPasswordSendOTP);
router.put('/reset-password', signUpController.resetPassword);

module.exports = router;
