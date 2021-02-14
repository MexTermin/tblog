const { Router } = require("express");
const Controller = require("../controller/post-controller");
const bodyParser = require("body-parser");
const { check } = require("express-validator");
const urlencodeParser = bodyParser.urlencoded({ extended: false });
const router = Router();

router.route("/all")
    .get((req, res, next) => {
    res.json({
        status: 200,
        text: "all post",
        });
    });

router.route("/new")
    .post(
        urlencodeParser,
        [
            check("user_id", "the field user_id is invalid")
                .exists()
                .isLength({ min: 20 }),
            check("likes","the field likes must be a valid number")
                .exists()
                .isLength({ min: 1 })
        ],
        Controller.CreatePublication
    );

module.exports = router;
