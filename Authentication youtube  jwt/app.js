const express = require('express');
const app = express();
const cors = require('cors');
const { hashSync, compareSync } = require('bcrypt');
const {UserModel,tokenModel }= require('./config/database');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const path=require("path")

app.use(express.json())
app.use(express.static("public"))
app.set("view engine", "ejs")
app.set("views", path.join(__dirname + "/views"))
app.use(express.urlencoded({ extended: true }))
app.use(cors());
app.use(passport.initialize());



require('./config/passport')

app.get("/register",(req,res)=>{
    res.render("register")
})
app.post('/register', (req, res) => {
    const user = new UserModel({
        username: req.body.username,
        password: hashSync(req.body.password, 10)
    })

    user.save().then(user => {
        res.send({
            success: true,
            message: "User created successfully.",
            user: {
                id: user._id,
                username: user.username
            }
        })
    }).catch(err => {
        res.send({
            success: false,
            message: "Something went wrong",
            error: err
        })
    })
})

app.post('/login', (req, res) => {
    UserModel.findOne({ username: req.body.username }).then(user => {
        //No user found
        if (!user) {
            return res.status(401).send({
                success: false,
                message: "Could not find the user."
            })
        }

        //Incorrect password
        if (!compareSync(req.body.password, user.password)) {
            return res.status(401).send({
                success: false,
                message: "Incorrect password"
            })
        }

        const payload = {
            username: user.username,
            id: user._id
        }

        const token = jwt.sign(payload, "Random string", { expiresIn: "1d" })

        return res.status(200).send({
            success: true,
            message: "Logged in successfully!",
            token: "Bearer " + token
        })
    })
})

app.get("/login",(req,res)=>{
    res.render("login")
})
app.get('/protected', passport.authenticate('jwt', { session: false }),(req, res)=> {
    console.log(req.user._id)
    return res.status(200).send({
        success: true,
        user: {
            id: req.user._id,
            username: req.user.username,
        }
    })
    console.log('hello');
})

app.listen(5000, () => console.log("Listening to port 5000"));