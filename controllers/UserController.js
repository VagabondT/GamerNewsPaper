const User = require('../models/user');
const Account = require('../models/account')
const AppError = require('../Utilities/appError');
const catchAsync = require('../Utilities/catchAsync');
const handler = require('./handler');


exports.createUser = handler.createOne(User);
exports.updateUser = catchAsync(async(req,res,next) =>{

    const UpdatedUser = await User.findById(res.locals.user.id);
    if (UpdatedUser !== null){
        const rawBirthday = req.body.Birthday
        var convertedBd=  rawBirthday.split('/');
        
        const Birthday = new Date(parseInt(convertedBd[2]),parseInt(convertedBd[1]),parseInt(convertedBd[0]));

        UpdatedUser.Name = req.body.Name;
        UpdatedUser.Address = req.body.Address;
        UpdatedUser.Birthday = Birthday;
        UpdatedUser.Email = req.body.Email;
        UpdatedUser.Phone = req.body.Phone;

        await UpdatedUser.save();
       
        const accActivation = await Account.findById(res.locals.userAccount.id).select("Active");
        accActivation.Active = true;
        await accActivation.save()


        res.status(200).redirect('/')
    }else{
        return next( new AppError('Không tìm thấy user này'))
    }
});
exports.deleteUser= handler.deleteOne(User);

exports.getAllUser = handler.getAll(User);

exports.getUser = async (req,res,next) =>{

    if (ObjectId.isValid(req.params.id)){
        let query = Category.findById(new ObjectId(req.params.id));

        const doc = await query;
        if (!doc) {
            res.status(404).json({
                status: 'failed',
                data: {
                    msg: 'There is no category with that id'
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

