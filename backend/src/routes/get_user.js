const { Router } = require("express");
const { check } = require("express-validator");
const bodyParser = require("body-parser");
const urlencodeParser = bodyParser.urlencoded({ extended: false });
const userController = require('../controller/user-controller')

// Variables
const router = Router();

router.route("/all")
  .get(
    urlencodeParser,
    userController.getAll
  )

router.route("/:id")
  .get(
    urlencodeParser,
    [
      check("id", "the field likes must be a valid ID").isLength({ min: 24 })
    ],
    userController.getByID
  )
  .delete(
    urlencodeParser,
    [
      check("id", "the field likes must be a valid ID").isLength({ min: 24 })
    ],
    userController.Delete
  )

router.route('/email/:email')
  .get(
    urlencodeParser,
    [
      check("email", "Incorrect Email")
        .isEmail()
        .normalizeEmail()
    ],
    userController.getByEmail
  );
module.exports = router;
