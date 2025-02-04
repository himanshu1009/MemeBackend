const {SuccessResponse, ErrorResponse} = require('../utils/common');
const {StatusCodes} = require('http-status-codes');
const {CarService} = require('../services');



const getAllCars= async (req, res) => {
    try {
        const cars = await CarService.getAllCars();
        SuccessResponse.data = cars;
        return res.status(StatusCodes.OK).json(SuccessResponse);
        
    } catch (error) {
        console.log(error.message);
        ErrorResponse.error = error.message;
        return res.status(error.StatusCodes).json(ErrorResponse);
        
    }
}
const addCar = async (req, res) => {
    try {
        const {maker, models } = req.body;
        // Check if all details are provided
        if (!maker || !models || !models.length) {
            models.forEach((model) => {
                if (!model.model_name  || !model.dimensions || !model.dimensions.length_mm || !model.dimensions.width_mm) {
                    ErrorResponse.error = 'Please provide all details';
                    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
                }
            });
        }
        const car = await CarService.addCar(maker, models);
        SuccessResponse.data = car;
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        console.log(error.message);
        ErrorResponse.error = error.message;
        return res.status(error.StatusCodes).json(ErrorResponse);
    }
}

const getAllBrands = async (req, res) => {
    try {
        const brands = await CarService.getAllBrands();
        SuccessResponse.data = brands;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        console.log(error.message);
        ErrorResponse.error = error.message;
        return res.status(error.StatusCodes).json(ErrorResponse);
    }
}

const getAllModelsByBrandId = async (req, res) => {
    try {
        const {id} = req.params;
        const models = await CarService.getAllModelsByBrandId(id);
        SuccessResponse.data = models;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        console.log(error.message);
        ErrorResponse.error = error.message;
        return res.status(error.StatusCodes).json(ErrorResponse);
    }
}

module.exports = {getAllBrands, getAllCars, addCar, getAllModelsByBrandId};