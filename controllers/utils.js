const nodemailer= require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");
//sendgrid setup
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)




const sendEmail = async(email,subject,payload,template)=>{
  try{
   



    // const source = fs.readFileSync(path.join(__dirname,template),"utf8");
    // const compiledTemplate = handlebars.compile(source);
    // const options = () => {
    //   return{
    //     from: process.env.EMAIL_USERNAME,
    //     to: email,
    //     subject: subject,
    //     html: compiledTemplate(payload)
    //   }
    // }


    const source = fs.readFileSync(path.join(__dirname,template),"utf8");
    const compiledTemplate = handlebars.compile(source);

    const msg = {
      to: 'swimleft@gmail.com', // Change to your recipient
      from: process.env.SENDGRID_EMAIL, // Change to your verified sender
      subject: 'SarCache PW Reset',
      
      html: compiledTemplate(payload)
    }
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent')
      })
      .catch((error) => {
        console.error(error)
      })


  }catch(err){
    console.log(err)
  }




}

module.exports=sendEmail;