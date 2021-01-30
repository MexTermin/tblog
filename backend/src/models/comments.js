const {Schema, model} = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const commentSchema = new Schema({
   publication_id:{type: String, required: true},
   user_id:{type: String, required: true},
   descripcion:{type: String, default: uuidv4()},
   createdAt:{ type: Date, default: Date.now}
})

module.exports = model('Comment', commentSchema)
