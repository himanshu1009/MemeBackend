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

async function getAllPosts() {
    try {
        const posts = await PostRepo.getAll();
        const updatePost = await Promise.all(posts.map(async (post) => {
            const {name, avatar} = await UserRepo.get(post.User);            
            return {...post._doc, User: {name, avatar}};
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
        return {...post._doc, User: {name, avatar}};
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
module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost  
}