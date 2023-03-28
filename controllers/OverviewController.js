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
    featuredPost.DateChanged= prettyDate(featuredPost.DateChanged);
    posts.shift();
    const ConvertedPosts = ConvertObjectTime(posts);
    res.status(200).render('News',{
        title:'All posts',
        posts: ConvertedPosts,
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

function prettyDate(dateString){
    //if it's already a date object and not a string you don't need this line:
    var date = new Date(dateString);
    var d = date.getDate();
    // var monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
    var monthNames = [ "Thg1", "Thg2", "Thg3", "Thg4", "Thg5", "Thg6","Thg6", "Thg8", "Thg9", "Thg10", "Thg11", "Thg12" ];
    var m = monthNames[date.getMonth()];
    var y = date.getFullYear();
    return d+' '+m+' '+y;
}

function ConvertObjectTime(object){

    object.forEach(element => {
        
        var holder= element.DateChanged;
        element.DateChanged = prettyDate(holder);
    });
    return object;
} 