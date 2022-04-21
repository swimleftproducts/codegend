const { User } = require('../models');
const { genPassword, compare } = require('../authConfig/helpers');
const passport = require('../authConfig');
const { ApiError } = require('../errorHandling/errorHandler');
const sendEmail = require('./utils.js')
const crypto = require("crypto");

module.exports = {
  test(req, res, next) {
    res.send('hi there');
  },
  async register(req, res, next) {
    const { email, name } = req.body;
    if (email === '' || name === '') {
      next(
        ApiError.badRequest(
          'Email and Name required',
          'Email and Name required',
          20000
        )
      );
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (!user) {
        const saltHash = genPassword(req.body.password);
        const salt = saltHash.salt;
        const hash = saltHash.hash;
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          hash: hash,
          salt: salt,
        });
        await newUser.save();

        // no perform authentication flow

        passport.authenticate('local', function (err, user, info) {
          if (err) {
            return next(err);
          }

          if (!user) {
            next(
              ApiError.badCredentials(
                'Incorrect Credentials',
                'could not find one of username or password',
                2002
              )
            );
            return;
          }

          req.logIn(user, function (err) {
            if (err) {
              return next(err);
            }

            return res.json({
              name: req.user.name,
              authenticated: true,
              id: req.user.id,
            });
          });
        })(req, res, next);

        // res.json({name:req.body.name,id: newUser.id,authenticated:true})
      } else {
        next(
          ApiError.existingCredentials(
            'account exists for that email',
            'account exists for that email',
            2004
          )
        );
        return;
      }
    } catch (err) {
      next(
        ApiError.internal(
          'database error',
          'Error occurred in registering user',
          2003
        )
      );
    }
  },
  async login(req, res, next) {
    const { email, password } = req.body;

    passport.authenticate('local', function (err, user, info) {
      if (err) {
        return next(err);
      }

      if (!user) {
        next(
          ApiError.badCredentials(
            'incorrect credentials',
            'could not find one of username or password',
            2002
          )
        );
        return;
      }

      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }

        return res.json({
          name: req.user.name,
          authenticated: true,
          id: req.user.id,
        });
      });
    })(req, res, next);
  },
  async logout(req, res, next) {
    await req.logOut();
    res.send({ authenticated: false });
  },
  isAuthenticated(req, res, next) {
    if (req.user) {
      res.send({ name: req.user.name, id: req.user.id, authenticated: true });
    } else {
      res.send({ authenticated: false });
    }
  },

  async reset(req,res,next){
    const {email} = req.body;
     let user = await User.findOne({ email:email});
     if(!user){
       return
     }
     let resetToken = crypto.randomBytes(32).toString("hex");
     user.resetToken = resetToken;
     user.save()
    // build link

    //send email to user that includes a link with the token  
    await sendEmail(user.email,"GeoCache - Password Reset",{rootURL:process.env.ROOTURL,token:resetToken},"./templates/welcome.handlebars")
     res.send({message: "hi!"})
  },



  async resetfinish(req,res,next){
    const {password, token}=req.body
    //find user with matching token
    let user = await User.findOne({ resetToken: token });
    if (user) {
      const saltHash = genPassword(password);
      const salt = saltHash.salt;
      const hash = saltHash.hash;
      user.hash= hash;
      user.salt= salt;
      user.resetToken=null;

      await user.save();
      res.send({message:"Password Reset"})
    }else{
      res.status(404).send({message:"Reset not successful"})
    }

  

  }
};
