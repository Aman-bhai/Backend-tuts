const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/passport-jwt');

const userSchema = mongoose.Schema({
    username: String,
    password: String
})

const tokenSchema=mongoose.Schema({
    auth_token:{
        type:String,
        require:true,
        unique:true
    }
})

let tokenModel=mongoose.model("Token",tokenSchema)


const UserModel = mongoose.model('User', userSchema);

module.exports = {UserModel,tokenModel};