const CrudRepositery = require("./crud-repository");
const { Post } = require("../models");

class PostRepository extends CrudRepositery {
    constructor() {
        super(Post);
    }
}
module.exports=PostRepository;