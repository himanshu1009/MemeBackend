const express =require('express');
const router =express.Router();

const HomeRoute =require('./homeRoute');
const AuthRoute =require('./authRoute');
const PostRoute =require('./postRoute');
const UserRoute =require('./userRoute');


router.use('/',HomeRoute);
router.use('/auth',AuthRoute);
router.use('/post',PostRoute);
router.use('/user',UserRoute);


module.exports=router;