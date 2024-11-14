const nodemailer = require("nodemailer");
const dotenv=require("dotenv");

dotenv.config();

const emailSend= async (option)=>{
    const transporter = nodemailer.createTransport({
        host:process.env.EMAIL_HOST ,
        port: process.env.EMAIL_PORT,
        service:process.env.EMAIL_SERVICE,
        auth: {
          user:process.env.EMAIL_USER ,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      const emailOptions={
    from: process.env.EMAIL_USER, // sender address
    to: option.to, // list of receivers
    subject: option.subject, // Subject line
    text: option.text, // plain text body
    // html: "<b>Hello world?</b>", // html body
    }

    await transporter.sendMail(emailOptions)
      
}

module.exports=emailSend
