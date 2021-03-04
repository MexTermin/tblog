const { Router } = require("express");
const { check } = require('express-validator');
const bodyParser = require('body-parser');
const commetController = require("../controller/comment-controller");

const urlencodeParser = bodyParser.urlencoded({ extended: false });
const router = Router();


router.route('/comment')
    .post(
        urlencodeParser,
        [
            check('user_id', 'Id is not correct')
                .exists()
                .isLength({ min: 24 })
                .isLength({ max: 24 }),
            check('publication', 'Publication ID is incorrect')
                .exists()
                .isLength({ min: 24 })
                .isLength({ max: 24 }),
            check('comment', 'Should be more or less than this')
                .isLength({ min: 1 })
                .isLength({ max: 250 }),
        ], commetController.save
    )

router.route("/comment/:publication")
    .get(
        urlencodeParser,
        [
            check('publication', 'Publication ID is incorrect')
                .exists()
                .isLength({ min: 24 })
                .isLength({ max: 24 }),
        ],
        commetController.getComments
    )
router.route("/comment/id/:id")
    .get(
        urlencodeParser,
        [
            check('id', 'ID is incorrect')
                .exists()
                .isLength({ min: 24 })
                .isLength({ max: 24 }),
        ],
        commetController.getComment
    )

module.exports = router;