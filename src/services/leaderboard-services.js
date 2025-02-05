const { PostRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");
const { StatusCodes } = require("http-status-codes");

const PostRepo = new PostRepository();

const getTopN = async (number) => {
    try {
        const posts = await PostRepo.getAll();
        posts.sort((a, b) => b.Upvotes.lenght - a.Upvotes.lenght);
        posts.splice(number);
        const topN= posts.map((post,index) => {
            return {
                position: index + 1,
                _id: post._id,
                Title: post.Title,
                Upvotes: post.Upvotes.length
            };
        });

        
        return topN;
    } catch (error) {
        throw new AppError(
            "Not able to get the resource",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}
module.exports = {
    getTopN
};