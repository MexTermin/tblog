const Publication = require('../models/publication')
const { validationResult } = require('express-validator');

const controller = {}
const imagesName = (array) => {
    total = ""
    array.forEach(image => {
        total += image.filename + ","
    })
    return total
}
controller.CreatePublication = async (req, res) => {
    try {
        const error = validationResult(req)
        if (!error.isEmpty()) {
            return res.json(error.array())
        }
        const { description, image, user_id, likes, createdAt } = req.body
        if (description == "" && image == "") {
            if (req.file == undefined) {
                return res.json({ message: "can't save empty publication" });
            }
        }

        const post = new Publication({
            description,
            image: image ? image : imagesName(req.files),
            user_id,
            likes,
            createdAt
        })
        await post.save()
        res.status(200).json({ message: "post save" })
    }
    catch (e) {
        return res.status(500).json({ message: e.message })
    }

}


controller.getAll = async (req, res) => {
    try {
        const result = await Publication.find().limit(20);
        if (result) {
            res.json(result);
        }

    } catch (e) {
        res.json({ message: e.message });
    }
}

controller.getById = async (req, res) => {
    try {
        const result = await Publication.findById({ _id: req.params.id });
        res.json(result);
    } catch (e) {
        res.json({ message: e.message });
    }
}

module.exports = controller
