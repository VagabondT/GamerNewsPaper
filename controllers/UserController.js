const User = require('../models/user');
const Account = require('../models/account')
const AppError = require('../Utilities/appError');
const catchAsync = require('../Utilities/catchAsync');
const handler = require('./handler');

var ObjectId = require('mongoose').Types.ObjectId;


exports.createUser = handler.createOne(User);
exports.updateUser = catchAsync(async(req,res,next) =>{
    console.log(res.locals.userAccount);

    const UpdatedUser = await User.findById(res.locals.user.id);
    if (UpdatedUser !== null){
        
        if (req.body.Name !== undefined)
            UpdatedUser.Name = req.body.Name;
        
        if (req.body.Address !== undefined)
            UpdatedUser.Address = req.body.Address;

        if (req.body.Birthday !== undefined){
            const rawBirthday = req.body.Birthday
            var convertedBd=  rawBirthday.split('/');
            const Birthday = new Date(parseInt(convertedBd[2]),parseInt(convertedBd[1]),parseInt(convertedBd[0]));
            UpdatedUser.Birthday = Birthday;
        }


        if (req.body.Email !== undefined){
            
            UpdatedUser.Email = req.body.Email;
        }

            
        if (req.body.Phone !== undefined)
            UpdatedUser.Phone = req.body.Phone;


        await UpdatedUser.save();
       
        if (res.locals.userAccount.Active == false){
            const accActivation = await Account.findById(res.locals.userAccount.id).select("Active");
            accActivation.Active = true;
            await accActivation.save();
        }

        res.status(200).redirect('/')
    }else{
        return next( new AppError('Không tìm thấy user này'))
    }
});
exports.deleteUser= handler.deleteOne(User);

exports.getAllUser = handler.getAll(User);

exports.getUser = async (req,res,next) =>{

    if (ObjectId.isValid(req.params.id)){
        let query = User.findById(new ObjectId(req.params.id));

        const doc = await query;
        if (!doc) {
            res.status(404).json({
                status: 'failed',
                data: {
                    msg: 'There is no user with that id'
                }
            })
        }else{
            res.status(200).json({
                status: 'success',
                data: {
                    data: doc
                }
            })
        }
    }else{
        res.status(409).json({
            status: 'conflict',
            data: {
                msg: 'Invalid id'
            }
        })
    }   
}

