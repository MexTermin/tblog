const {Router} = require("express");
const bcrypt = require('bcrypt-node')
const router = Router();
const path = require('path')
const {v4: uuidv4 } = require('uuid')
const users = require('../models/user')


router.get('/', (req, res, next)=>{
    res.render('index')
})

router.get('/login',(req, res, next)=>{
    res.json({
        text:'succees'
    })
})

router.post('/signup', async (req, res)=>{
    try{

        // const emailFind = users.find({"email": req.body.email})
        // const emailFound  = (await emailFind)[0].value
        // console.log(emailFound)

        // if( req.body.email != emailFound){
        //     console.log('success')
        // }

        const date = new Date()
        const newUser = new users({
            name : req.body.name , 
            lastName:req.body.lastName, 
            email:req.body.email, 
            password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)), 
            description:{description: req.body.description, id: uuidv4() + date.toString()},
            image: {file: req.file, id: uuidv4() + date.toString()}
        })
        await newUser.save()
        res.redirect('/login')

    }catch{
        res.redirect('/')
    }
})


module.exports = router;
