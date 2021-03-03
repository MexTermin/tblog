const { validationResult } = require("express-validator");
const User = require("../models/user");

const userController = {};

userController.getByID = async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.json({ message: error.array()[0].msg });
    }
    await User.findById(req.params.id)
        .then((user) => {
            const notFound = {
                message:
                    "User is not in database maybe the id that you give is incorrect.",
            };
            if (user) {
                return res.json(user);
            }
            return res.send(notFound);
        })
        .catch((err) => {
            console.log(err.message);
            return res.json(err.message);
        });
};

userController.getAll = async (req, res) => {
    await User.find()
        .then((user) => {
            return res.json(user);
        })
        .catch((e) => {
            return e.message;
        });
}
userController.getByEmail = async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.json({ message: error.array()[0].msg });
    }
    await User.findOne({ email: req.params.email })
        .then((user) => {
            const notFound = {
                message:
                    "User isn't found in database maybe the email that you give is incorrect.",
            };
            if (user) {
                return res.json(user);
            }
            return res.send(notFound);
        })
        .catch((err) => {
            console.log(err);
            return res.json(err.message);
        });
}

userController.Delete = async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({
        text: "User was delecte correctly",
    });
}
module.exports = userController;
