const catchAsync = require('./../Utilities/catchAsync');
const Post = require('../models/posts')

exports.GetOverview = catchAsync(async (req,res ,next) =>{

    const posts = await Post.aggregate([
        {
            $lookup:
            {
                from: "Category",
                localField: 'Category',
                foreignField: '_id',
                as: 'Category'
            }
        }
    ])


    const featuredPost = posts[0];
    posts.shift();

    console.log(posts[0].Category[0].name);

    res.status(200).render('index',{
        title:'All posts',
        posts,
        featuredPost
    })

})

exports.GetNewsOverview = catchAsync(async (req,res ,next) =>{

    const posts = await Post.aggregate([
        {
            $lookup:
            {
                from: "Category",
                localField: 'Category',
                foreignField: '_id',
                as: 'Category'
            }
        }
    ])


    const featuredPost = posts[0];
    posts.shift();

    res.status(200).render('News',{
        title:'All posts',
        posts,
        featuredPost
    })

})

exports.RenderNewsview = catchAsync(async (req,res,next) =>{


    const post = Post.findById(req.params.id)

    const featuredPost = await Post.aggregate([
        {
            $lookup:
            {
                from: "Category",
                localField: 'Category',
                foreignField: '_id',
                as: 'Category'
            }
        }
    ])

    res.status(200).render('newsview',{
        title:'Newsview',
        post,
        featuredPost
    })

})

