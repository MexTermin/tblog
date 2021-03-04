const Comment = require("../models/comments");
const { validationResult } = require("express-validator");

const commetController = {};

commetController.save = async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(422).jsonp(error);
    }
    const newComment = new Comment({
        user_id: req.body.user_id,
        comment: req.body.comment,
        publication: req.body.publication
    });

    await newComment.save();
    res.json({
        message: "Recived",
    });
};

commetController.getComments = async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(422).jsonp({ message: error.array()[0].msg });
    }

    await Comment.find({ publication: req.params.publication })
        .then((comments) => {
            if (comments) {
                return res.json(comments);
            } else {
                return res.json({ message: "Not Found" });
            }
        })
        .catch((e) => {
            return res.json(e.message);
        });
};

commetController.getComment = async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(422).jsonp({ message: error.array()[0].msg });
    }

    await Comment.findById({ _id: req.params.id })
        .then((comments) => {
            if (comments) {
                return res.json(comments);
            } else {
                return res.json({ message: "Not Found" });
            }
        })
        .catch((e) => {
            return res.json(e.message);
        });
};

module.exports = commetController;
