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
