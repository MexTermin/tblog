const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')

passport.use('login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async(email, password, done)=>{
  try {
    const user = await User.findOne({email})
    if(!user){
      return done(null, false, { message: 'User not found'})
    }
    const validate = await user.isValidPassword(password)
    if(!validate){
      return done(null, false, {message:'Wrong password'})
    }
    return done(null, user, { message:'Login succesfull'})
  } catch (error) {
    return done(error)
  }
}))

passport.serializeUser(function(user, done) {
  done(null, user.id);
});
 
passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});