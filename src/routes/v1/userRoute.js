const express=require('express');
const router=express.Router();
const {validateAuthRequest}=require('../../middleware');

const {Usercontroller}=require('../../controllers');

router.get('/get/:id',Usercontroller.getUserById);
router.get('/auth',validateAuthRequest.checkAuth
    ,Usercontroller.getUserByAuth);

module.exports=router;