const express =require('express');
const router =express.Router();

const HomeRoute =require('./homeRoute');
const AuthRoute =require('./authRoute');


router.use('/',HomeRoute);
router.use('/auth',AuthRoute);


module.exports=router;