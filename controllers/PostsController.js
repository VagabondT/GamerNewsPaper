const Post = require('../models/posts');
const handler = require('./handler');
const AppError = require('./../Utilities/appError');
const catchAsync = require('../Utilities/catchAsync')


var ObjectId = require('mongoose').Types.ObjectId;


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
    if (foundPost.Status == "draft"){
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