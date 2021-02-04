const {Router} = require("express");
const bcrypt = require('bcrypt-node')
const router = Router();
const users = require('../models/user');
const bodyParser = require('body-parser')
const { check, validationResult } = require('express-validator');

const urlencodeParser = bodyParser.urlencoded({extended: false})

const getUserinfo = async(res, req) => { 
    
    const email = req.body.email;

    const emailFind = await users.findOne({"email": email})
    if(emailFind == null){
        const newUser = new users({
            username: req.body.username,       
            email:req.body.email, 
            password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)), 
            description:req.body.description,
            image: {file: req.file}
        })
        return newUser
    }
    console.log('Se encuentra en la base de datos')
    res.redirect('/signin')
 }

router.get('/', (req, res, next)=>{
    res.json({
        text:'frontpage'
    })
})

router.get('/login',(req, res, next)=>{
    res.json({
        text:'login'
    })
})
router.get('/signin', (res, req)=>{
    res.json({
        text:'signin'
    })
})
router.post('/signin',urlencodeParser,[
    check('username', 'This username must be 3+ characters long')
        .exists()
        .isLength({min: 3}),
    check('email', 'Email is not valid')
        .isEmail()
        .normalizeEmail(),
    check('password', 'Password should be at least 5 chars long or is not alphanumeric')
        .isLength({min: 5})
        .isAlphanumeric()
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
                res.redirect('/signin')
            })
            .catch(error => console.log(error))
})


module.exports = router;
