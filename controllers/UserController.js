const User = require('../models/user');
const handler = require('./handler');


exports.createUser = handler.createOne(User);
exports.updateUser = handler.updateOne(User);
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
