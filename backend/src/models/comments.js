const {Schema, model} = require('mongoose');
const uuidv4 = require("uuid/v4");

let idUnique = uuidv4();

const commentSchema = new Schema({
   publication_id:{type: String, required: true},
   user_id:{type: String, required: true},
   descripcion:{type: String, default: idUnique}
})

module.exports = model('Comment', commentSchema)
