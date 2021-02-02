const {Schema, model} = require('mongoose');
const bcrypt = require('bcrypt-node')

const userSchema = new Schema({
    name:{ type: String, required: true},
    lastName:{ type: String, required: true},
    email:{ type: String, required: true},
    password:{ type: String, required: true},
    description:{type: JSON},
    image:{type: JSON},
    createdAt:{ type: Date, default: Date.now}

})

userSchema.method.encryptPassword = (password)=>{
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

userSchema.method.comparePassword =function (password) { 
    return bcrypt.compareSync(password, this.password)
 }
module.exports = model('users', userSchema)
