const { SuccessResponse, ErrorResponse } = require("../utils/common");
const { StatusCodes } = require("http-status-codes");
const  AppError  = require("../utils/errors/app-error");
const { LeaderboardService } = require("../services");

const getLeaderboard = async (req, res) => {  
    try {
        // Get the leaderboard
        req.params.number;
        const response= await LeaderboardService.getTopN(req.params.number);
        SuccessResponse.data = response;
        console.log(response);
        
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        console.log(error.message);
        ErrorResponse.error = error.message;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}
module.exports = {  
    getLeaderboard
};