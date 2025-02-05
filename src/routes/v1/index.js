const express =require('express');
const router =express.Router();

const HomeRoute =require('./homeRoute');
const AuthRoute =require('./authRoute');
const PostRoute =require('./postRoute');
const UserRoute =require('./userRoute');
const LeaderboardRoute =require('./leaderboard');


router.use('/',HomeRoute);
router.use('/auth',AuthRoute);
router.use('/post',PostRoute);
router.use('/user',UserRoute);
router.use('/leaderboard',LeaderboardRoute);


module.exports=router;