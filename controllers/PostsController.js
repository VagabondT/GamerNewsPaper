const Post = require('../models/posts');
const User = require('../models/user')
const handler = require('./handler');
const AppError = require('./../Utilities/appError');
const catchAsync = require('../Utilities/catchAsync')
const multer = require('multer')
const sharp = require('sharp')
const fs = require('fs')
var path = require('path');

// const multerStorage = multer.diskStorage({
//     destination: (req, file, cb) =>{
//         cb(null, 'public/img/PostThumbnail');
//     },
//     filename: (req, file, cb) =>{
//         const ext = file.mimetype.split('/')[1];

//         cb(null, `post-${req.body.Title}-${Date.now()}.${ext}`);
//     }
// })

const multerStorage = multer.memoryStorage();

const multiFilter =  (req,file,cb)=>{
    if (file.mimetype.startsWith('image')){
        cb(null, true);
    }else{
        cb(new AppError("Please upload image file only!", 400),false);
    }
}

const upload = multer({
    storage: multerStorage,
    fileFilter: multiFilter
})

var ObjectId = require('mongoose').Types.ObjectId;


exports.uploadPhoto = upload.single('photo')
exports.resizePhoto = (req,res,next) =>{
    if (!req.file) return next();
    req.file.filename = `post-${req.body.Title}-${Date.now()}.jpeg`
    sharp(req.file.buffer).resize(1000,563).toFormat('jpeg').jpeg({quality: 100}).toFile(`public/img/PostThumbnail/${req.file.filename}`);
    console.log(req.file.filename);
    next();
}   


exports.getAllPosts = handler.getAll(Post);
// exports.getPost = handler.getOne(Post, { path: 'Category'});
exports.getPost = async (req,res,next) =>{


    if (ObjectId.isValid(req.params.id)){
        let query = Post.findById(new ObjectId(req.params.id));

        const doc = await query;
        if (!doc) {
            res.status(404).json({
                status: 'failed',
                data: {
                    msg: 'There is no posts with that id'
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

exports.createPost = handler.createOne(Post)
exports.updatePost = handler.updateOne(Post);
exports.deletePost = catchAsync(async (req, res, next) => {
   const foundPost =  await Post.findById(req.params.id)
    console.log(foundPost.Author);

    if (foundPost.Status == "draft" && foundPost.Author == req.user.id){
        const draftdoc = await Post.findById(req.params.id);

        var imageName = 'img/PostThumbnail/default.jpg'

        var pathToDel = path.join(__dirname, `../public/${draftdoc.Thumbnail}`);

        if (draftdoc.Thumbnail != imageName){
            fs.unlink(pathToDel, (err) => {
                if (err) throw err;
                console.log(`${draftdoc.Thumbnail} was deleted`);
            })
        }

        const doc = await Post.findByIdAndDelete(req.params.id);

        if (!doc) {
            return next(new AppError('No document found with that ID', 404));
          }
      
          res.status(204).json({
            status: 'success',
            data: null
          });

    }else if (req.userAccount.Role == "admin")
    {
        const doc = await Post.findByIdAndDelete(req.params.id);
        if (!doc) {
            return next(new AppError('No document found with that ID', 404));
          }
      
          res.status(204).json({
            status: 'success',
            data: null
        });
    }else{
        
        res.status(403).json({
            status: 'forbidden',
            data: null
          });
    }
    
    
});


exports.GETEditorPostsData = catchAsync(async(req,res,next)=>{

    if (res.locals.userAccount.Role == "editor"){
        const posts = await Post.find({Author: res.locals.user.id}).populate("Category").populate("Author");
        var allCount = posts.length;
        var publishCount =0;
        var submitCount = 0;
        var cancelCount =0;
        posts.forEach(element => {
            if (element.Status =="publish")
                publishCount++;
    
            if (element.Status =="submit")
                submitCount++;
            if (element.Status =="cancel")
                cancelCount++;
        });
        
        res.status(200).json({
            title:'Bài viết của bạn',
            posts,
            allCount,
            publishCount,
            submitCount,
            cancelCount,
            Role: res.locals.userAccount.Role
    
        })
    }else if (res.locals.userAccount.Role == "admin" || res.locals.userAccount.Role == "moderator"){
        const posts = await Post.find().sort({DateChanged: -1}).populate("Category").populate("Author")
        var allCount = posts.length;
        var publishCount = 0;
        var submitCount = 0;
        var cancelCount = 0;

        posts.forEach(element => {
            if (element.Status =="publish")
                publishCount++;
    
            if (element.Status =="submit")
                submitCount++;
            if (element.Status == "cancel")
                cancelCount++;
                
            
        });
        var i = posts.length;
        while (i--) {
            if (posts[i].Status == 'draft') {
                posts.splice(i, 1);
            }
        }
        console.log(posts.length);
        res.status(200).json({
            title:'Bài viết của bạn',
            posts,
            allCount,
            publishCount,
            submitCount,
            cancelCount,
            Role: res.locals.userAccount.Role
    
        })
    }else{
        return next(new AppError('Lỗi!',500))
    }
    
})


//Lưu post mới vào database
exports.CreatePostFromPage = catchAsync(async(req, res, next)=>{
    console.log(req.file);
    console.log(req.body);
    const currentUser = await User.findById(res.locals.user.id);
    var imageName = 'img/PostThumbnail/default.jpg'
    if (currentUser){
        if (req.file) imageName = 'img/PostThumbnail/'+ req.file.filename;

        const newPostSave = await Post.create({
            Author: currentUser._id,
            Title: req.body.Title,
            Content: JSON.stringify(req.body.Content),
            Category: req.body.Category,
            Description: req.body.Description,
            Thumbnail: imageName,
            Status: req.body.Status
    
        });
        res.status(200).json({
            status: 'success',
            data: newPostSave
            
        });
    }else{
        return next(new AppError('Invalid user!',404))
    }

 
})