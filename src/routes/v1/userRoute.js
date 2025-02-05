const express=require('express');
const router=express.Router();

const {Usercontroller}=require('../../controllers');

router.get('/get/:id',Usercontroller.getUserById);

module.exports=router;