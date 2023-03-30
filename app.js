var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const cors = require('cors');
// const corsOptions = require('./config/corsOptions');
// const credentials = require('./middlewares/credentials');

const AppError = require('./Utilities/appError');
const ErorrHandler = require('./controllers//errorController');

var app = express();

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
// app.use(credentials);

// Cross Origin Resource Sharing
// app.use(cors(corsOptions));

const indexRouter = require('./routes/index');
const newsRouter = require('./routes/news')
const apiPostRouter = require('./routes/api/post');
const apiCategoryRouter = require('./routes/api/category');
const apiUserRouter = require('./routes/api/users');
const apiAccountRouter = require('./routes/api/account');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//Authorization below this line
// app.use(verifyJWT);
app.use('/api/account', apiAccountRouter);
app.use('/',indexRouter );
app.use('/news',newsRouter)
app.use('/api/posts', apiPostRouter);
app.use('/api/category',apiCategoryRouter);
app.use('/api//users',apiUserRouter);




// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler


app.all('*', (req, res, next) => {

  next(new AppError(`Cant find ${req.originalUrl} on this server!`,404))
});

// app.use((err,req,res,next)=>{
//   err.statusCode = err.statusCode || 500;
//   err.status = err.status || 'error';
//   res.status(err.statusCode).json({
//     status: err.status,
//     message: err.message

//   })
// })

app.use(ErorrHandler)

module.exports = app