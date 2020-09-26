let mongoose = require('mongoose');

let Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;

let UserSchema = new Schema({
    userId: ObjectId,    
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    confirmPassword: String,
    userType: String,
    isActivated: Boolean,
    createDate: Date
})

let User = mongoose.model('Users', UserSchema);
module.exports = User;