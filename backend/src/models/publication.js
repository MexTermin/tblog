const {Schema, model} = require('mongoose');
const { v4: uuidv4 } = require('uuid');

 

const publicationSchema = new Schema({
   description:{type: String},
   image:{type: String, default:uuidv4()},
   user_id:{type: String, required: true},
   likes:{type: Number, required: true},
   createdAt:{ type: Date, default: Date.now}
})

module.exports = model('Publication', publicationSchema)
