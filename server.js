const dotnv = require('dotenv');
const mongoose = require('mongoose');
dotnv.config({path: './config.env'});
const app = require('./app');
const port = process.env.PORT

const db = process.env.DATABASE.replace('PASSWORD', process.env.DATABASE_PASSWORD);

mongoose.connect(
    db,{
        useNewUrlParser: true, 
        useUnifiedTopology: true 
}).then(() => console.log('Kết nối db thành công!'));

// process.on('uncaughtException', err => {
//     console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
//     console.log(err.name, err.message);
//     process.exit(1);
//   });



app.listen(port,() => {
    console.log(`Server đang chạy ở cổng ${port}...`);
});

// process.on('unhandledRejection', err => {
//     console.log('UNHANDLED REJECTION! 💥 Shutting down...');
//     console.log(err.name, err.message);
//     server.close(() => {
//       process.exit(1);
//     });
//   });
  
//   process.on('SIGTERM', () => {
//     console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
//     server.close(() => {
//       console.log('💥 Process terminated!');
//     });
//   });