const {Router} = require("express");
const router = Router();
const users = require('../models/user');
const bodyParser = require('body-parser')
const { check, validationResult } = require('express-validator');
const urlencodeParser = bodyParser.urlencoded({extended: false})

const passport = require('passport')
const jwt = require('jsonwebtoken')

const getUserinfo = async(res, req) => { 
    
    const email = req.body.email;

    const emailFind = await users.findOne({ "email": email })
    if (emailFind == null) {
        const newUser = new users({
            username: req.body.username,       
            email:req.body.email, 
            password: req.body.password, 
            description:req.body.description,
            image: {file: req.file}
        })
        return newUser
    }
    console.log('Se encuentra en la base de datos')
    res.redirect('/signin')
}

router.get('/signin', (res, req)=>{
    res.send('Signin')
})

router.post('/signin',urlencodeParser,[
    check('username', 'This username must be 3+ characters long')
        .exists()
        .isLength({ min: 3 }),
    check('email', 'Email is not valid')
        .isEmail()
        .normalizeEmail(),
    check('password', 'Password should be at least 5 chars long')
        .isLength({min: 5})
],(req, res)=>{
        const error = validationResult(req)
        if(!error.isEmpty()){
            return res.status(422).jsonp(error.array())
        }
        getUserinfo(res,req)
            .then(function(result, reject){
                if(result){
                    result.save()
                     res.redirect('/login')
                }
            }) 
})

router.get('/login', (req, res)=>{
    res.json({
        text: 'Login'
    })
})

router.post('/login', async(req, res, next) =>{
    passport.authenticate('login', async(err, user, info)=>{
        try {
            if(err || !user){
                const error = new Error('new Error')
                return next(error)
            }
            req.login(user, {session:true}, async(err)=>{
                if(err) return next(err)
                const body = {_id: user._id, email: user.email}
                const token = jwt.sign({user:body}, 'top_ecret')
                return res.json({token})
            })
        } catch (error) {
            return next(error)
        }
    })(req, res, next)
})

module.exports = router;
