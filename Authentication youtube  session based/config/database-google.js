const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/passport-google');

const userSchema = mongoose.Schema({
    name: String,
    googleId: String,
})

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;