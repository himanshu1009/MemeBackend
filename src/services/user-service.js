const AppError = require("../utils/errors/app-error");
const { StatusCodes } = require("http-status-codes");
const { PostRepository } = require("../repositories");
const { UserRepository } = require("../repositories");
const UserRepo = new UserRepository();
const PostRepo = new PostRepository();

const getUserById = async (id) => { 
    try {
        const {name,email,} = await UserRepo.get(id);
        const posts=await PostRepo.getAll({User:id}); 
        posts.forEach((post) => {
            post.User = undefined;
        });   
        const NumberofUpvotes = posts.reduce((acc, post) => acc + post.Upvotes.length, 0);   
        return {name,email,NumberOfPosts:posts.length,NumberofUpvotes,posts};
    } catch (error) {
        throw new AppError(
            "Not able to get the resource",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}
const getUserByAuth = async (user) => {
    try {
        const {name,email,avatar} = await UserRepo.get(user.userId);
        const posts=await PostRepo.getAll({User:user.userId}); 
        posts.forEach((post) => {
            post.User = undefined;
        });   
        const NumberofUpvotes = posts.reduce((acc, post) => acc + post.Upvotes.length, 0);   
        return {name,email, avatar,NumberOfPosts:posts.length,NumberofUpvotes,posts};
    } catch (error) {
        throw new AppError(
            "Not able to get the resource",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}
module.exports = {
    getUserById,
    getUserByAuth
}
