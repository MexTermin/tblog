const {Schema, model} = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const commentSchema = new Schema({
   user_id:{type: String, required: true},
   comment :{type: String, required: true},
   publication :{type: String, required: true},
   createdAt:{ type: Date, default: Date.now}
})

module.exports = model('Comment', commentSchema)
