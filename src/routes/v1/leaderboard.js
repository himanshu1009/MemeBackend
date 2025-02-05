const express=require('express');
const router=express.Router();
const {LeaderboardController}=require('../../controllers');

router.get('/top/:number',LeaderboardController.getLeaderboard);
module.exports=router;