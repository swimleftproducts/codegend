const nodemailer= require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;


// const oauth2Client = new OAuth2(
//   process.env.CLIENT_ID,
//   process.env.CLIENT_SECRET,
//   "https://developers.google.com/oauthplayground"
// )
// oauth2Client.setCredentials({
//      refresh_token: "1//04tOynYjaztFXCgYIARAAGAQSNwF-L9IrgA7dYGn9kpmZLDG1xFokTy7BnsPIlUDIm9cErH81X3Bd4kGTNxnanh9UTiK5bkd9_LQ"
// });
// const accessToken = oauth2Client.getAccessToken()
// console.log(process.env.REFRESH_TOKEN)

const sendEmail = async(email,subject,payload,template)=>{
  try{
    console.log("password",process.env.EMAIL_PASSWORD)
    console.log("uname",process.env.EMAIL_USERNAME)

    // **** old working code
    // const transporter = nodemailer.createTransport({
    //   host: process.env.EMAIL_HOST,
    //   port: 465,
    //   auth:{
    //     user: process.env.EMAIL_USERNAME,
    //     pass: process.env.EMAIL_PASSWORD
    //   }
    // })
    // const transporter= nodemailer.createTransport({
    //  service: "gmail",
    //  auth: {
    //       type: "OAuth2",
    //       user: "swimleft@gmail.com", 
    //       clientId: process.env.CLIENT_ID,
    //       clientSecret: process.env.CLIENT_SECRET,
    //       refreshToken: "1//04tOynYjaztFXCgYIARAAGAQSNwF-L9IrgA7dYGn9kpmZLDG1xFokTy7BnsPIlUDIm9cErH81X3Bd4kGTNxnanh9UTiK5bkd9_LQ",
    //       accessToken: accessToken
    //       },
    //       tls: {
    //         rejectUnauthorized: false
    //       }
    //   });


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

    // transporter.sendMail(options(),(error,info)=>{
    //   if(error){
    //     console.log(error)
    //     return error
    //   }else{
    //     console.log("email sent")
    //     return res.status(200).json({success:true})
    //   }
    // })


  }catch(err){
    console.log(err)
  }




}

module.exports=sendEmail;