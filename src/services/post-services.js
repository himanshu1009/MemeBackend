const { PostRepository,UserRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");
const { StatusCodes } = require("http-status-codes");

const PostRepo = new PostRepository();
const UserRepo = new UserRepository();

async function createPost(data) {
    try {
        const post = await PostRepo.create(data);
        return post;
    } catch (error) {
        console.log(error);
        
        throw new AppError(
            "Not able to create the resource",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}

async function getAllPosts(query) {
    try {
        query = query || {};
        query.limit = query.limit || 10;
        query.page = query.page || 1;
        const posts = await PostRepo.getAllposts(query);
        const updatePost = await Promise.all(posts.map(async (post) => {
            const {name, avatar} = await UserRepo.get(post.User);            
            return {...post, User: {name, avatar,id:post.User}};
        }));
        return updatePost;
    } catch (error) {
        throw new AppError(
            "Not able to get the resource",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}
async function getPostById(id) {
    try {
        const post = await PostRepo.get(id);
        console.log(post);
        
        const {avatar, name} = await UserRepo.get(post.User);
        return {...post._doc, User: {name, avatar,id:post.User}};
    } catch (error) {
        throw new AppError(
            "Not able to get the resource",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}
async function updatePost(id, data) {
    try {
        const post = await PostRepo.update(id, data);
        return post;
    } catch (error) {
        throw new AppError(
            "Not able to update the resource",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}
async function deletePost(id) {
    try {
        const post = await PostRepo.destroy(id);
        return post;
    } catch (error) {
        throw new AppError(
            "Not able to delete the resource",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}
async function getComments (id) {
    try {
        const post = await PostRepo.get(id);
        const commentsWithUserDetails = await Promise.all(post.Comments.map(async (comment) => {
            const {name, avatar} = await UserRepo.get(comment.User);
            return {...comment._doc, User: {name, avatar}};
        }));
        return commentsWithUserDetails;
    } catch (error) {
        throw new AppError(
            "Not able to get the resource",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}
module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost ,
    getComments 
}