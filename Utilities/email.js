const nodemailer = require('nodemailer');
const pug = require('pug')
const htmlToText = require('html-to-text');

// module.exports = class Email{
//     constructor(user, url){
//         this.to = user.Email;
//         this.firstName = user.Name.split(' ')[user.Name.length - 1];
//         this.url = url;
//         this.from = `Gamer Thời BÁO <${process.env.EMAIL_FROM}>`;


//     }

//     newTransport(){
//         // if (process.env.NODE_ENV === 'production'){
//         //     return nodemailer.createTransport({
//         //         host: process.env.EMAIL_HOST,
//         //         port: process.env.EMAIL_PORT,
//         //         auth: {
//         //             user: process.env.EMAIL_USERNAME,
//         //             pass: process.env.EMAIL_PASSWORD
//         //         }
//         //     })
//         // }

//         return nodemailer.createTransport({
//             host: process.env.EMAIL_HOST,
//             port: process.env.EMAIL_PORT,
//             auth: {
//               user: process.env.EMAIL_USERNAME,
//               pass: process.env.EMAIL_PASSWORD
//             }
//         });
//     }

//     async send(template, subject){
//         const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
//             firstName: this.firstName,
//             url: this.url,
//             subject
//         });

//         const mailOptions ={
//             from: this.from,
//             to: this.to,
//             subject,
//             html,
//             text: htmlToText.fromString(html)
//         };

//         await this.newTransport().sendMail(mailOptions);
//     }

//     async sendWelcome(){
//         await this.send('welcome', 'Chào mừng đến với cộng đồng Gamer Thời BÁO!');
//     }

//     async sendPasswordReset(){
//         await this.send(
//             'passwordReset',
//             'Mã lấy lại mật khẩu của bạn (chỉ tồn tại trong 10 phút)'
//         );
//     }
// }

const sendEmail = options =>{
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const mailOptions ={
        from: 'Gamer Thoi BAO',
        to: options.email,
        subject: options.subject,
        text: options.message
    }

    transporter.sendMail(mailOptions)
}

module.exports = sendEmail;