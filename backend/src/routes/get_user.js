const {Router} = require("express");
const router = Router();
const User = require('../models/user');
const { check } = require("express-validator");
const bodyParser = require("body-parser");
const { validationResult } = require('express-validator');
const urlencodeParser = bodyParser.urlencoded({ extended: false });
router.get('/all', async (req, res)=>{
    await User.find()
        .then(user=>{
            return res.json(user)
        })
        .catch((e)=>{
            return e
        })
})

router.get('/:id',
    urlencodeParser,
    [
    check("id","the field likes must be a valid number")
    .exists()
    .isLength({ min: 24 })
    ],
    async (req, res)=>{
        const error = validationResult(req)
        if (!error.isEmpty()) {
        
            return res.json({'message':error.array()[0].msg})
        }
        await User.findById(req.params.id)
            .then(user =>{
                const notFound = {
                    message:"User is not in database maybe the id that you give is incorrect."
                }
                if(user){
                    return res.json(user)
                }
                return res.send(notFound)
            })
            .catch((err) => {
                console.log(err.message)
                return res.json(err.message)
            })
})

router.get('/:email', async (req, res)=>{
   await User.findById(req.params.email)
    .then(user =>{
        const notFound = {
            message:"User isn't found in database maybe the email that you give is incorrect."
        }
        if(user){
            return res.json(user)
        }
        return res.send(notFound)
    })
    .catch((err) => {
        console.log(err)
        return res.json(err.message)
    })
})

router.delete('/:id', async (req, res)=>{
    await User.findByIdAndDelete(req.params.id)
    res.json({
        text: 'User was delecte correctly'
    })
})
module.exports = router;