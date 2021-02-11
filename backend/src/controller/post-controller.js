const Publication = require('../models/publication')
const { validationResult } = require('express-validator');

const controller = {}
controller.CreatePublication = async (req, res) => {
    try {
        const error = validationResult(req)
        if (error) {
            return res.status(422).jsonp(error.array())
        }
        const { description, image, user_id, likes, createdAt } = req.body
        const post = new Publication({
            description,
            image: image ? image : req.body.filename,
            user_id,
            likes,
            createdAt
        })

        const result = await post.save()
        res.status(200).json({ message: "post save", result: result })
    }
    catch (e) {
        return res.status(500).json({ message: e.message })
    }

}

module.exports = controller