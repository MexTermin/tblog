const {Router} = require("express");
const router = Router();
const User = require('../models/user');

router.get('/:id', (req, res)=>{
    User.findById(req.params.id)
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

module.exports = router;