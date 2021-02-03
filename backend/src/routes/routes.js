const {Router} = require("express");
const bcrypt = require('bcrypt-node')
const router = Router();
const users = require('../models/user');
const cons = require("consolidate");

const getUserinfo = async(res, req) => { 
    
    const email = req.body.email;

    const emailFind = await users.findOne({"email": email})
    if(emailFind == null && req.body.password){
        const newUser = new users({
            name : req.body.name , 
            lastName:req.body.lastName,     
            email:req.body.email, 
            password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)), 
            description:req.body.description,
            image: {file: req.file}
        })
        return newUser
    }
    console.log('Se encuentra en la base de datos o no ha escrito la contraseña')
    res.redirect('signup')
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
router.get('/signup', (res, req)=>{
    res.json({
        text:'signup'
    })
})
router.post('/signup', async (req, res)=>{
        getUserinfo(res,req)
            .then(function(result, reject){
                if(result){
                    result.save()
                    res.redirect('/login')
                }
            })
})


module.exports = router;
