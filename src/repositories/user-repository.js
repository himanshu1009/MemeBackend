const CrudRepositery = require("./crud-repository");
const { User } = require("../models");

class UserRepository extends CrudRepositery {
    constructor() {
        super(User);
    }
}
module.exports=UserRepository;