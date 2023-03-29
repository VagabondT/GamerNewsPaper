const catchAsync = require('./../Utilities/catchAsync');
const Post = require('../models/posts')

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
        var holder2 = element.DateCreate;
        element.DateChanged = prettyDate(holder);
        element.DateCreate = prettyDate(holder2);
    });
    return object;
} 

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
    featuredPost.DateCreate= prettyDate(featuredPost.DateCreate);
    posts.shift();
    const ConvertedPosts = ConvertObjectTime(posts);
    res.status(200).render('News',{
        title:'All posts',
        posts: ConvertedPosts,
        featuredPost
    })

})

exports.RenderNewsview = catchAsync(async (req,res,next) =>{


    const post = await Post.findOne({Slug: req.params.id}).populate('Category');
    let postmodifed = post;
    postmodifed.DateCreate= prettyDate(post.DateCreate);
    postmodifed.DateChanged= prettyDate(post.DateChanged);


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

    var modifiedFeaturedPosts = ConvertObjectTime(featuredPost);

    res.status(200).render('newsview',{
        title:'Newsview',
        post:postmodifed,
        featuredPost:modifiedFeaturedPosts
    })

})

