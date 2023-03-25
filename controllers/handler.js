const catchAsync = require('./../Utilities/catchAsync');
const AppError = require('./../Utilities/appError');


exports.getAll = Model => 
catchAsync(async (req, res, next) =>{

    let query = Model.find({});
    const doc = await query;
    res.status(200).json({
        status:'success',
        data: {
            data:doc
        }
    })
})