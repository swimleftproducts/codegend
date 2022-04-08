const nodemailer= require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");

const sendEmail = async(email,subject,payload,template)=>{
  try{
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 465,
      auth:{
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    })

    const source = fs.readFileSync(path.join(__dirname,template),"utf8");
    const compiledTemplate = handlebars.compile(source);
    const options = () => {
      return{
        from: process.env.EMAIL_USERNAME,
        to: email,
        subject: subject,
        html: compiledTemplate(payload)
      }
    }

    transporter.sendMail(options(),(error,info)=>{
      if(error){
        return error
      }else{
        console.log("email sent")
        return res.status(200).json({success:true})
      }
    })


  }catch(err){
    console.log(err)
  }




}

module.exports=sendEmail;