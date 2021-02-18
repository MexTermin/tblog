const {Router} = require("express");
const router = Router();
const User = require('../models/user');

router.get('/all', async (req, res)=>{
    await User.find()
        .then(user=>{
            return res.json(user)
        })
        .catch((e)=>{
            return e
        })
})

router.get('/:id', async (req, res)=>{
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
            console.log(err)
            return res.json(err)
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
        return res.json(err)
    })
})

router.delete('/:id', async (req, res)=>{
    await User.findByIdAndDelete(req.params.id)
    res.json({
        text: 'User was delecte correctly'
    })
})
module.exports = router;