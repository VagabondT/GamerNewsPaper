const dotnv = require('dotenv');
const mongoose = require('mongoose');
const port = process.env.PORT || 3000

dotnv.config({path: './config.env'});
const app = require('./app');

const db = process.env.DATABASE.replace('PASSWORD', process.env.DATABASE_PASSWORD);
mongoose.connect(
    db,{
        useNewUrlParser: true, 
        useUnifiedTopology: true 
}).then(() => console.log('Kết nối db thành công!'));

//TEST CREATE MODEL
// const accountModel = require('./models/account');

// const newAcc = new accountModel({
//     _id: 0,
//     Login: 'aki',
//     Password: 'erqewr134232',
//     ConfirmPassword: 'erqewr13423269'
// })

// newAcc.save().then((data) =>{
//     console.log(data);
// }).catch(err => {
//     console.log(err);
// })

app.listen(port,() => {
    console.log(`Server đang chạy ở cổng ${port}...`);
});

