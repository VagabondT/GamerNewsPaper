const Account = require('../models/account');
const User = require('../models/user');
const catchAsync = require('../Utilities/catchAsync');
const handler = require('./handler');
const jwt = require('jsonwebtoken');
const AppError = require('../Utilities/appError');

const signToken = id =>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRES_TIME
    });
}

exports.createAccount = catchAsync(async (req,res, next) =>{

    const newAcc = await Account.create({
        UserName: req.body.UserName,
        Password: req.body.Password,
        ConfirmPassword: req.body.ConfirmPassword
    });


    var newUser = await User.create({Account: newAcc._id});
 
    const token = signToken(newAcc._id)

    res.status(201).json({
        status: 'success',
        token,
        account: newAcc,
        user: newUser
    });

});

exports.login = catchAsync( async (req,res,next) =>{
    const {UserName,Password} = req.body;

    //check username vaf password ton tai
    if(!UserName || !Password){
        res.status(400).json({
            status:'failed',
            msg : 'Please provide your username and password'
        })
    }
    //check user va pass la dung
    const account = await Account.findOne({UserName}).select('Password');
    const correctPass = await account.CorrectPassword(Password, account.Password);
    console.log(correctPass);
    if (!account || !correctPass){
        res.status(401).json({
            status:'failed',
            msg : 'Incorrect email or password'
        })
    }
    //send token
    const token = signToken(account._id);

    res.status(200).json({
        status:'success',
        token
    })
})

exports.updateAccount = handler.updateOne(Account);
exports.deleteAccount = handler.deleteOne(Account);

exports.getAllAccounts = handler.getAll(Account);

exports.getAccount = catchAsync(async (req,res,next) =>{
    console.log(req.params.id);
    if (ObjectId.isValid(req.params.id)){
        let query = Account.findById(new ObjectId(req.params.id));

        const doc = await query;
        if (!doc) {
            res.status(404).json({
                status: 'failed',
                data: {
                    msg: 'There is no account with that id'
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
 
})
