const { SuccessResponse, ErrorResponse } = require("../utils/common");
const { Postservice } = require("../services");
const { StatusCodes } = require("http-status-codes");
const  AppError  = require("../utils/errors/app-error");
const {PostRepository} = require("../repositories");
const postRepo = new PostRepository();

const createPost = async (req, res) => {
    try {
        const { Title, Caption,Image } = req.body;
        console.log(req.body);
        
        const post = await Postservice.createPost({ Title, Caption,Image, User: req.user.userId });
        SuccessResponse.data = post;
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        console.log(error.message);
        ErrorResponse.error = error.message;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

const getAllPosts = async (req, res) => {
    try {
        const posts = await Postservice.getAllPosts();
        SuccessResponse.data = posts;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        console.log(error.message);
        ErrorResponse.error = error.message;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

const getPostById = async (req, res) => {
    try {
        const post = await Postservice.getPostById(req.params.id);
        if (!post) {
            throw new AppError("Post not found", StatusCodes.NOT_FOUND);
        }
        SuccessResponse.data = post;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        console.log(error.message);
        ErrorResponse.error = error.message;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

const updatePost = async (req, res) => {
    try {
        const existingPost = await Postservice.getPostById(req.params.id);
        if (!existingPost) {
            throw new AppError("Post not found", StatusCodes.NOT_FOUND);
        }
        if (existingPost.User.toString() !== req.user.userId.toString()) {
            throw new AppError("You are not authorized to update this post", StatusCodes.UNAUTHORIZED);
        }
        const { Title, Caption,Image } = req.body;
        const post = await Postservice.updatePost(req.params.id, { Title, Caption,Image });
        SuccessResponse.data = post;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        console.log(error.message);
        ErrorResponse.error = error.message;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

const deletePost = async (req, res) => {
    try {
        const existingPost = await Postservice.getPostById(req.params.id);
        if (!existingPost) {
            throw new AppError("Post not found", StatusCodes.NOT_FOUND);
        }
        if (existingPost.User.id.toString() !== req.user.userId.toString()) {
            throw new AppError("You are not authorized to delete this post", StatusCodes.UNAUTHORIZED);
        }
        await Postservice.deletePost(req.params.id);
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        console.log(error.message);
        ErrorResponse.error = error.message;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}
const UpvotePost = async (req, res) => {
    try {
        
        const post = await postRepo.get(req.params.id);
        if (!post) {
            throw new AppError("Post not found", StatusCodes.NOT_FOUND);
        }
        if (post.Upvotes.includes(req.user.userId)) {
            post.Upvotes.remove(req.user.userId);
            await post.save();
        }
        else{
            post.Upvotes.push(req.user.userId);
            await post.save();
        }
        SuccessResponse.data = post;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        console.log(error.message);
        ErrorResponse.error = error.message;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}
const addComment = async (req, res) => {
    try {
        const post = await postRepo.get(req.params.id);
        if (!post) {
            throw new AppError("Post not found", StatusCodes.NOT_FOUND);
        }
        post.Comments.push({ Description: req.body.Description, User: req.user.userId });
        await post.save();
        SuccessResponse.data = post;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        console.log(error.message);
        ErrorResponse.error = error.message;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}
const getComments = async (req, res) => {
    try {
        const Comments= await Postservice.getComments(req.params.id);
        SuccessResponse.data = Comments;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        console.log(error.message);
        ErrorResponse.error = error.message;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

module.exports = { 
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
    UpvotePost,
    addComment,
    getComments
}
