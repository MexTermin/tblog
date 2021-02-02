const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')

passport.use(new  LocalStrategy(function (username, password, done) { 
    if(username == 'Miguel' && password == "123456")
        return done(null,{ id: 1, name: "cody"})
    done(null, false)
 }))

passport.serializeUser(function (user, done) { 
    done(null, user.id);
 })

passport.deserializeUser(function (id, done) { 
    done(null,{ id: 1, name: "cody"} )
 })

app.get('/',(req, res, next)=>{
    if(req.isAuthenticated()) return next()
    res.render('login')
},(req, res)=>{
    //si ya iniciamos session mostrar vista
    res.send('hola')
    //si no hemos iniciado session redirec to login
})

app.get('/login', (req, res)=>{
    //mostrar formulario
    res.render('login')
})

app.post('/login', passport.authenticate('local', {
    successRedirect : '/',
    failureRedirect : '/login'
}))

// passport.serializeUser((user, done)=>{
//     done(null, user.id)
// })

// passport.deserializeUser=(async (id, done)=>{
//     const user = await User.findById(id)
//     done(null, user)
// })

// passport.use('local-signup', new LocalStrategy({
    
//     emailField:'email',
//     passwordField:'password',
//     passReqToCallback: true

// }, async (req,email, password, done)=>{
    
//     const newUser = new User();
//     newUser.email = email;
//     newUser.password = newUser.encryptPassword(password);
//     await newUser.save();

//     done(null, newUser)

// }))