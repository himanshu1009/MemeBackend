const CrudRepositery = require("./crud-repository");
const { Post } = require("../models");

class PostRepository extends CrudRepositery {
    constructor() {
        super(Post);
    }
    async getAllposts(query={}) {
        try {
            const response = await this.model.find().sort({createdAt: -1}).skip(query.limit * (query.page - 1)).limit(query.limit);
            return response;
        } catch (error) {
            throw new AppError(
                'Something went wrong while getting all resources',
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }
}
module.exports=PostRepository;