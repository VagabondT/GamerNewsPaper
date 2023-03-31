var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var rateLimit = require('express-rate-limit')
const helmet = require('helmet')

const cors = require('cors');
// const corsOptions = require('./config/corsOptions');
// const credentials = require('./middlewares/credentials');

const AppError = require('./Utilities/appError');
const ErorrHandler = require('./controllers//errorController');

var app = express();

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
// app.use(credentials);


app.use(helmet.crossOriginEmbedderPolicy({ policy: "credentialless" }));
app.use(helmet.crossOriginOpenerPolicy());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(helmet.dnsPrefetchControl());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.originAgentCluster());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());
// Cross Origin Resource Sharing
// app.use(cors());

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
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit:"50mb" }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const limiter = rateLimit({
  max: 100,
  windowMs: 60*60*1000,
  message: 'Too many requests from this IP. Please try again after an hour.'
})

// app.use('/api', limiter)


//Authorization below this line
app.use('/api/account', apiAccountRouter);
app.use('/',indexRouter );
app.use('/news',newsRouter)
app.use('/api/posts', apiPostRouter);
app.use('/api/category',apiCategoryRouter);
app.use('/api//users',apiUserRouter);




// catch 404 and forward to error handler


app.all('*', (req, res, next) => {

  next(new AppError(`Cant find ${req.originalUrl} on this server!`,404))
});


app.use(ErorrHandler)

module.exports = app