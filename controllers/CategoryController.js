const Category = require('../models/category');
const handler = require('./handler');

var ObjectId = require('mongoose').Types.ObjectId; 


exports.createCategory = handler.createOne(Category);
exports.updateCategory = handler.updateOne(Category);
exports.deleteCategory = handler.deleteOne(Category);

exports.getAllCategory = handler.getAll(Category);
exports.getCategory = async (req,res,next) =>{
    console.log(req.params.id);
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
