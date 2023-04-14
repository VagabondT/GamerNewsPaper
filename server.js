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




app.listen(port,() => {
    console.log(`Server đang chạy ở cổng ${port}...`);
});
