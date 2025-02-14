const CrudRepositery = require("./crud-repository");
const { Post } = require("../models");
class PostRepository extends CrudRepositery {
    constructor() {
        super(Post);
    }
    async getAllposts(query = {}) {
        try {
            let sortOption = { createdAt: -1 }; // Default: newest posts first
            
            if (query.sort && query.sort === 'hot') {
                sortOption = { UpvotesLength: -1 }; // Sort by upvotes count (descending)
            }
    
            const limit = query.limit ? parseInt(query.limit) : 10; // Default limit: 10
            const page = query.page ? parseInt(query.page) : 1; // Default page: 1
    
            const response = await this.model.aggregate([
                { $addFields: { UpvotesLength: { $size: "$Upvotes" } } }, // Add a virtual field
                { $sort: sortOption }, // Sort by virtual field
                { $skip: limit * (page - 1) }, // Apply pagination
                { $limit: limit }
            ]);
            
    
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