const { SuccessResponse, ErrorResponse } = require("../utils/common");
const { SignUpService } = require("../services");
const { StatusCodes } = require("http-status-codes");
const { SignUpRepository } = require("../repositories");
const  AppError  = require("../utils/errors/app-error");
const { OTP,User } = require("../models");
const otpGenerator = require("otp-generator");
const pg = require('random-profile-generator')
const AvatarGenerator = require('random-avatar-generator')
const generator = new AvatarGenerator.AvatarGenerator();
const signUpRepository = new SignUpRepository();
const signUp = async (req, res) => {
    try {
        const {  email, password,otp } = req.body;
        // Check if all details are provided
        if ( !email || !password ||!otp)  {
            ErrorResponse.error = new AppError('All fields are required', StatusCodes.BAD_REQUEST);
            return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
        }
        if(!email.endsWith('@nith.ac.in') ){
            ErrorResponse.error = new AppError('Please enter a valid NIT Hamirpur email', StatusCodes.BAD_REQUEST);
            return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
        }
        const existingUser = await signUpRepository.findByEmail(email);
        if (existingUser) {
            ErrorResponse.error = new AppError('User already exists', StatusCodes.BAD_REQUEST);
            return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
        }
        const responseotp = await OTP.find({email}).sort({createdAt:-1}).limit(1);
        
        if (responseotp.length === 0 || otp !== responseotp[0].otp) {
            ErrorResponse.error = new AppError('The OTP is not valid', StatusCodes.BAD_REQUEST);
            return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
        }
        OTP.deleteMany({email:email}).then((result)=>console.log(result));
        
        const response = await SignUpService.signUp({
            name: pg.name(),
            avatar: generator.generateRandomAvatar(),
            email,
            password,
            otp
        });
        SuccessResponse.data = response;
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        console.log(error);

        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}
const sendOTP = async (req, res) => {
    try {
      const { email } = req.body;
      if(!email.endsWith('@nith.ac.in') ){
        ErrorResponse.error = 'Please enter a valid NIT Hamirpur email';
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
      // Check if user is already present
      const checkUserPresent = await User.findOne({ email });
      // If user found with provided email
      if (checkUserPresent) {
        ErrorResponse.error = 'User is already registered';
        return res.status(StatusCodes.CONFLICT).json(ErrorResponse);
      }
      let otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      let result = await OTP.findOne({ otp: otp });
      while (result) {
        otp = otpGenerator.generate(6, {
          upperCaseAlphabets: false,
        });
        result = await OTP.findOne({ otp: otp });
      }
      const otpPayload = { email, otp };
      const otpBody = await OTP.create(otpPayload);
      SuccessResponse.data = "OTP Send Successfully";
      return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
      console.log(error.message);
      ErrorResponse.error = error.message;
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
  };

const signIn = async (req, res) => {
    try {
        const response = await SignUpService.signIn(req.body);
        SuccessResponse.data = response;
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}
const resetPassword = async (req, res) => {
    try {
        const {  email, password, otp } = req.body;
        // Check if all details are provided
        if (!email || !password || !otp) {
            ErrorResponse.error = new AppError('All fields are required', StatusCodes.BAD_REQUEST);
            return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
        }
        if(!email.endsWith('@nith.ac.in') ){
            ErrorResponse.error = new AppError('Please enter a valid NIT Hamirpur email', StatusCodes.BAD_REQUEST);
            return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
        }
        
        const existingUser = await signUpRepository.findByEmail(email);
        if (!existingUser) {
            console.log("ye");
            ErrorResponse.error = new AppError('User not found', StatusCodes.NOT_FOUND);
            return res.status(StatusCodes.NOT_FOUND).json(ErrorResponse);
        }
        const responseotp = await OTP.find({email}).sort({createdAt:-1}).limit(1);
        if (responseotp.length === 0 || otp !== responseotp[0].otp) {
            ErrorResponse.error = new AppError('The OTP is not valid', StatusCodes.BAD_REQUEST);
            return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
        }
        OTP.deleteMany({email:email}).then((result)=>console.log(result));
        const response = await SignUpService.resetPassword(email, password);
        SuccessResponse.data = response;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}
module.exports = {
    signUp,
    signIn,
    resetPassword,
    sendOTP
}
