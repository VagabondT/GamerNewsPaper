const catchAsync = require('./../Utilities/catchAsync');
const Post = require('../models/posts');
const User = require('../models/user')
const Category = require('../models/category');
const Posts = require('../models/posts');
const AppError = require('../Utilities/appError');
var QuillDeltaToHtmlConverter = require('quill-delta-to-html').QuillDeltaToHtmlConverter;

function prettyDate(dateString){

    var dateString2 = dateString.toString();

    //if it's already a date object and not a string you don't need this line:
    var date = new Date(dateString2);
    var d = date.getDate();
    // var monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
    var monthNames = [ "Thg1", "Thg2", "Thg3", "Thg4", "Thg5", "Thg6","Thg6", "Thg8", "Thg9", "Thg10", "Thg11", "Thg12" ];
    var m = monthNames[date.getMonth()];
    var y = date.getFullYear();
    return d+' '+m+' '+y;
}

function ConvertObjectTime(object){

    object.forEach(element => {
        if (element.DateChanged!== null){
            var holder= element.DateChanged;
            element.DateChangedString = prettyDate(holder);
        }
        if (element.DateCreate !== null){
            var holder2 = element.DateCreate;
            element.DateCreateString = prettyDate(holder2);
        }

    });
    return object;
} 

exports.GetOverview = catchAsync(async (req,res ,next) =>{

    const GetPosts = await Post.find({}).sort({"DateCreate": -1}).limit(5).populate("Category");


    const featuredPost = GetPosts[0];
    GetPosts.shift();

    if (res.locals.userAccount != undefined){
        res.status(200).render('index',{
            title:'All posts',
            posts: GetPosts,
            featuredPost
        })
    }else{
        res.status(200).render('index',{
            title:'All posts',
            posts: GetPosts,
            featuredPost
        })
    }

})

exports.GetNewsOverview = catchAsync(async (req,res ,next) =>{

    const GetPosts = await Post.find({}).sort({"DateCreate": -1}).limit(7).populate("Category");

    var featuredPost = GetPosts[0];

    featuredPost.DateCreateString = prettyDate(featuredPost.DateCreate);
    
    GetPosts.shift();
    var ConvertedPosts = ConvertObjectTime(GetPosts);
    res.status(200).render('News',{
        title:'All posts',
        posts: ConvertedPosts,
        featuredPost
    })

})

exports.RenderNewsview = catchAsync(async (req,res,next) =>{

    const post = await Post.findOne({Slug: req.params.id}).populate('Author').populate('Category')
    let postmodifed = post;
    try{

        const ops = JSON.parse(post.Content).ops;
        var cfg = {}
        var converter = new QuillDeltaToHtmlConverter(ops, cfg);
        postmodifed.Content = converter.convert();
    }catch(e){

    }
   

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
        Title:'Newsview',
        post:postmodifed,
        featuredPost:modifiedFeaturedPosts
    })
})

exports.RenderLoginPage = catchAsync(async(req,res,next)=>{
    res.status(200).render('login',{
        title:'Đăng nhập'
    })
})

exports.RenderRegisterPage = catchAsync(async(req,res,next)=>{
    res.status(200).render('register',{
        title:'Đăng ký | Gamer Thời BÁO'
    })
})

exports.RenderUserRegisterPage = catchAsync(async(req,res,next)=>{
    console.log(res.locals.user);
    const user = await User.findById(res.locals.user.id);
    let modifiedData = user;
    var convertDate = new Date(user.Birthday).toLocaleDateString('en-GB')
    modifiedData.Birthday = new Date(convertDate);

    res.status(200).render('userRegister',{
        title:'Đăng ký thông tin | Gamer Thời BÁO',
        userData: modifiedData,
        Birthday: convertDate
    })
})

//In trang createPost
exports.RenderCreatePostPage = catchAsync(async(req,res,next)=>{

    const categoryList = await Category.find();
    var categoryOption = [];
    categoryList.forEach(element => {
        categoryOption.push({Name: element.Name, Value: element.id}) 
    });

    categoryOption[0]["checked"] = true;

    if (!categoryList){
        res.status(200).render('createPost',{
            title:'Tạo bài viết | Gamer Thời BÁO',
        })
    }else{
        res.status(200).render('createPost',{
            title:'Tạo bài viết| Gamer Thời BÁO',
            Categories: categoryOption
        })
    }

})

exports.RenderUpdatePostPage = catchAsync(async(req,res,next)=>{

    const selectedPost = await Posts.findById(req.params.id);
    if (selectedPost){


        const ops = JSON.parse(selectedPost.Content).ops;
        var cfg = {}
        var converter = new QuillDeltaToHtmlConverter(ops, cfg);
        var content = converter.convert();



        const categoryList = await Category.find();
        var categoryOption = [];
        categoryList.forEach(element => {
            
            if (selectedPost.Category == element.id){
                categoryOption.push({Name: element.Name, Value: element.id, "checked": true}) 
            }else{
                categoryOption.push({Name: element.Name, Value: element.id});
            }

        });
    
    
        if (!categoryList){
            res.status(200).render('updatePost.pug',{
                title:'Sửa bài viết' + selectedPost.Name+ '| Gamer Thời BÁO',
                post:selectedPost,
                postContent: content
            })
        }else{
            res.status(200).render('updatePost.pug',{
                title:'Tạo bài viết| Gamer Thời BÁO',
                Categories: categoryOption,
                post: selectedPost,
                postContent: content
            })
        }
    }else{
        return next(new AppError("Không tìm thấy bài viết!",404));
    }
    
    

})

exports.UpdatePostPage = catchAsync(async(req,res,next)=>{

    const postData = await Posts.findByIdAndUpdate(req.params.id,{
        Title: req.body.Title,
        Content: req.body.Content,
        Category: req.body.Category

    });
    if (!postData) {
        return next(new AppError('No document found with that ID', 404));
    }
    res.status(200).json({
        status: 'success',
        data: {
          data: postData
        }
    });
})

//Lưu post mới vào database
exports.CreatePostFromPage = catchAsync(async(req, res, next)=>{

    const currentUser = await User.findById(res.locals.user.id);
    if (currentUser){

        const newPostSave = await Post.create({
            Author: currentUser._id,
            Title: req.body.Title,
            Content: JSON.stringify(req.body.Content),
            Category: req.body.Category,
            Description: req.body.Description
    
        });
        res.status(200).json({
            status: 'success'
        });
    }else{
        res.status(404).json({
            status: 'fail',
            message:'user not found!'
        });
    }


   
})

//Editor Post Page
exports.RenderEditorPostsPage = catchAsync(async(req,res,next)=>{
    const posts = await Posts.find({Author: res.locals.user.id}).populate("Category").populate("Author");
    var allCount = posts.length;
    var publishCount =0;
    var submitCount = 0;
    posts.forEach(element => {
        if (element.Status =="publish")
            publishCount++;

        if (element.Status =="submit")
            submitCount++;
    });
    
    res.status(200).render('controlPanel',{
        title:'Bài viết của bạn',
        posts,
        allCount,
        publishCount,
        submitCount

    })
})

