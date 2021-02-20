const { Router } = require("express");
const router = Router();
const Comment = require('../models/comments')
const { check, validationResult } = require('express-validator');
const bodyParser = require('body-parser');
const urlencodeParser = bodyParser.urlencoded({extended: false});

const getComment = async (req, res)=>{
    const newComment = new Comment({
        user_id: req.body.user_id,
        comment: req.body.comment
    })

    await newComment.save()
    res.json({
        message: "Recived"
    })
}

router.post('/comment', urlencodeParser,[
    check('user_id', 'Id is not correct')
        .exists()
        .isLength({ min: 24})
        .isLength({ max: 24}),
    check('comment', 'Should be more or less than this')
        .isLength({ min: 1})
        .isLength({ max: 250}),
],async (req, res)=>{
    const error = validationResult(req)
        if(!error.isEmpty()){
            return res.status(422).jsonp(error)
        }
        await getComment(req, res);        
})

module.exports =  router;