const {User} = require('../models')
const {genPassword, compare} = require('../authConfig/helpers')
const passport = require('../authConfig')
const {ApiError} = require('../errorHandling/errorHandler')

module.exports={
  test(req,res,next){
    res.send('hi there')
    console.log('example route')
  },
  async register(req,res,next){
    const {email, name}= req.body
    if(email==="" || name===""){
      next(ApiError.badRequest("Email and Name required","Email and Name required",20000))
    }
    try{        
        let user=await User.findOne({email: req.body.email})
        if(!user){   
            const saltHash = genPassword(req.body.password);
            const salt = saltHash.salt;
            const hash = saltHash.hash;
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                hash: hash,
                salt: salt,
            });
        await newUser.save()
        res.json({name:req.body.name,authenticated:true})
        }else{
            next(ApiError.existingCredentials("account exists for that email","account exists for that email",2004))
            return
        }
    }catch(err){        
        next(ApiError.internal('database error',"Error occurred in registering user",2003))
    }
  },
  async login(req,res,next){ 
    const {email, password} = req.body
    console.log(email, password)
    passport.authenticate(
        'local',
        function(err, user, info) {
          if (err) { return next(err); }
          
          if (!user) { next(ApiError.badCredentials("incorrect credentials","could not find one of username or password",2002))
          return }
          
          req.logIn(user, function(err) {
            if (err) { return next(err); }

            return res.json({name:req.user.name,authenticated:true});   
         });         
        })(req, res, next);
},
async logout (req,res,next){
  await req.logOut()
   res.send({authenticated:false})
},
isAuthenticated(req,res,next){
  if(req.user){
    res.send({name:req.user.name,authenticated:true})            
  }else{
    res.send({authenticated:false})
  }
},
  
}