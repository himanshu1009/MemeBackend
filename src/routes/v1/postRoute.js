const express=require('express');
const router=express.Router();

const {PostController}=require('../../controllers'); 
const { validateAuthRequest } = require('../../middleware');

router.post('/',validateAuthRequest.checkAuth,PostController.createPost);
router.get('/get',PostController.getAllPosts);
router.get('/get/:id',PostController.getPostById);
router.put('/update/:id',validateAuthRequest.checkAuth,PostController.updatePost);
router.delete('/delete/:id',validateAuthRequest.checkAuth,PostController.deletePost);
router.post('/upvote/:id',validateAuthRequest.checkAuth,PostController.UpvotePost);
router.post('/comment/:id',validateAuthRequest.checkAuth,PostController.addComment);

module.exports=router;