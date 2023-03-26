const Category = require('../models/posts');
const Post = require('../models/posts');
const handler = require('./handler');


exports.getAllPosts = handler.getAll(Post);
// exports.getPost = handler.getOne(Post, { path: 'Category'});
exports.getPost = async (req,res) =>{
    let query = Post.findById(req.params.id);
    const doc = await query;

    if (!doc) {
        return next(new AppError('No document found with that ID', 404));
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


