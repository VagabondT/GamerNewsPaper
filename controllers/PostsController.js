
const Post = require('../models/posts');
const handler = require('./handler');
const AppError = require('./../Utilities/appError');


exports.getAllPosts = handler.getAll(Post);
// exports.getPost = handler.getOne(Post, { path: 'Category'});
exports.getPost = async (req,res,next) =>{
    let query = Post.findById(req.params.id);
    const doc = await query;

    if (!doc) {
        res.status(404).json({
            status: 'failed',
            data: {
                msg: 'There is no post with that id'
            }
        
    })
    }

    res.status(200).json({
        status: 'success',
        data: {
            data: doc
        }
    })
}

exports.createPost = handler.createOne(Post)
exports.updatePost = handler.updateOne(Post);
exports.deletePost = handler.deleteOne(Post);


