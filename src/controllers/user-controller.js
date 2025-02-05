const { SuccessResponse, ErrorResponse } = require("../utils/common");
const { Userservice } = require("../services");
const { StatusCodes } = require("http-status-codes");
const  AppError  = require("../utils/errors/app-error");

const getUserById = async (req, res) => {
    try {
        const user = await Userservice.getUserById(req.params.id);
        if (!user) {
            throw new AppError("User not found", StatusCodes.NOT_FOUND);
        }
        SuccessResponse.data = user;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        console.log(error.message);
        ErrorResponse.error = error.message;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}
module.exports = {
    getUserById
}