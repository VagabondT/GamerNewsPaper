const Account = require('../models/account');
const User = require('../models/user');
const catchAsync = require('../Utilities/catchAsync');
const handler = require('./handler');
const jwt = require('jsonwebtoken');
const AppError = require('../Utilities/appError');
const {promisify} = require('util');
const Email = require('../Utilities/email')
const crypto = require('crypto');
var ObjectId = require('mongoose').Types.ObjectId;

const signToken = id =>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRES_TIME
    });
}

const createSendToken = (account, statusCode, req, res) => {
    const token = signToken(account._id);
    res.cookie('jwt', token, {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
    });
  
    // Remove password from output
    account.password = undefined;
    res.status(statusCode).json({
      status: 'success',
      token,
      data: {
        account
      }
    });
  };


exports.isLoggedIn = catchAsync(async (req,res,next) =>{
    if (req.cookies.jwt) {

        try {
            token = req.cookies.jwt;
            const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
            
            const currentAccount = await Account.findById(decoded.id);
            const currentUser = await User.findOne({Account: new ObjectId(decoded.id)})
            
            if (!currentAccount || !currentUser){
                return next();
            }
    
            if (currentAccount.ChangedPasswordAfter(decoded.iat)){
                return next();
            }
            
            res.locals.user = currentUser;
            res.locals.userAccount = currentAccount;

            return next();       

        } catch (error) {
            return next(); 
        }
    }
    
    next();
    
})

exports.protect = catchAsync(async (req,res,next) =>{

    //get token from headers
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
    }else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }


    if (!token){
        return next(new AppError('You are not logged in, please login first!', 401))
    }

    //veritification token

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    
    //check if user still exists

    const currentUser = await Account.findById(decoded.id);
    if (!currentUser){
        return next(new AppError('Token of this user is no longer exists!',401));
    }

    // check if user changed password after the token was issued
    if (currentUser.ChangedPasswordAfter(decoded.iat)){
        return next(new AppError('User recently changed password. Please login again', 401));
    }
    
    //grant access
    req.user = currentUser;
    res.locals.user = currentUser;
    
    next();
})

exports.allowRoles = (...roles) =>{
    return (req, res, next)=>{
        if (!roles.includes(req.user.Role)){
            return next(new AppError('You dont have permission to perform this action!', 403));
        }

        next();
    }
} 

exports.Signup = catchAsync(async (req,res, next) =>{

    const existedAccCheck =  await Account.findOne({UserName: req.body.UserName});
    const existedEmailCheck = await User.findOne({Email: req.body.Email})

    if (existedAccCheck || existedEmailCheck){
        res.status(409).json({
            status:'fail',
            message:'Username or email already exists'
        })

    }else{
        const newAcc = await Account.create({
            UserName: req.body.UserName,
            Password: req.body.Password,
            ConfirmPassword: req.body.ConfirmPassword,
            Active: false
        });

        console.log(newAcc);
    
        if (newAcc != undefined){

            try {
                const newUser = await User.create({
                    Account: new ObjectId(newAcc._id),
                    Email: req.body.Email
                });
                console.log(newUser);
                createSendToken(newAcc,201,req,res);
            } catch (error) {
                console.log(error);
                await Account.findByIdAndDelete(newAcc._id);
                res.status(500).json({
                    status:'fail',
                    message:'There is error! Please try later'
                })
            }
        }
        else{
            await Account.findByIdAndDelete(newAcc._id)
            res.status(500).json({
                status:'fail',
                message:'There is error! Please try later'
            })
        }
    }

});

exports.Login = catchAsync( async (req,res,next) =>{
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

    if (!account || !correctPass){
        res.status(401).json({
            status:'failed',
            msg : 'Incorrect email or password'
        })
    }
    //send token
    createSendToken(account,200,req,res);
})

exports.Logout = (req,res, next) =>{

    if (req.cookies.jwt){
        res.cookie('jwt', "LoggedOut", {
            expires: new Date(Date.now() + 10 * 1000),
          httpOnly: true
        });
        req.user = undefined;
        res.user = undefined;
        res.locals.user = undefined;
        res.status(200).json({status: 'success'});
    }
    res.status(200).json({status: 'failed'});
    
    
}

exports.forgotPassword = catchAsync(async (req,res,next) =>{
    //get user based on post account
    const user = await User.findOne({Email: req.body.email});
    if (!user){
        return next(new AppError('There is no user with this email address', 404));
    }

    //generate random reset token
    const userAccount = await Account.findById(user.Account);
    const resetToken = userAccount.CreateResetToken();
    await userAccount.save({validateBeforeSave:false});

    //send it through user email.
    try {
        const resetURL = `${req.protocol}://${req.get(
        'host'
        )}/api/account/resetPassword/${resetToken}`;

        // await new Email(user, resetURL).sendPasswordReset();

        const message = `Forgot password? Submit a PATCH request with your new password and confirmPassword to:
        ${resetURL}\nIf you didn't forget password, it's time to ignore this email.`

        await Email({
            email: user.Email,
            subject: 'Your password reset token (valid in 10 mins)',
            message
        })

        res.status(200).json({
            status: 'success',
            message: 'Token sent to email!'
        });

    } catch (error) {
        userAccount.passwordResetToken = undefined;
        userAccount.passwordResetExpires = undefined;
        await userAccount.save({ validateBeforeSave: false });

        return next(
        new AppError('There was an error sending the email. Try again later!'),500);
    }
    
})

exports.resetPassword = catchAsync(async (req,res,next) =>{
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    const user = await Account.findOne({PasswordResetToken: hashedToken, PasswordResetExpires: { $gt: Date.now()}});

    // nếu token hợp lệ, đổi mật khẩu cho user
    if (!user){
        return next(new AppError('Token is invalid or has expired.', 400));
    }

    user.Password = req.body.Password;
    user.ConfirmPassword = req.body.ConfirmPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    //cập nhật changePassworAt  

    //Đăng nhập người dùng này, gửi jwt
    const token = signToken(user._id);
    res.status(200).json({
        status: 'success',
        token
    });


})

exports.updatePassword = catchAsync(async (req,res,next)=>{

    const account = await Account.findById(new ObjectId(req.user._id)).select("+Password");

    if (!(await account.CorrectPassword(req.body.PasswordCurrent, account.Password))){
        return next(new AppError('Your current password is wrong!', 401));
    }

    account.Password = req.body.Password;
    account.ConfirmPassword = req.body.ConfirmPassword;
    await account.save();

    createSendToken(account, 200, req, res);

})

exports.updateAccount = handler.updateOne(Account);
exports.deleteAccount = handler.deleteOne(Account);

exports.getAllAccounts = handler.getAll(Account);

exports.getAccount = catchAsync(async (req,res,next) =>{

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
