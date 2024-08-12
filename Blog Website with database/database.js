const mongoose = require("mongoose")

const url = "mongodb://127.0.0.1:27017/BlogWebsite"

let promise = mongoose.connect(url, { useNewUrlParser: true }).then(() => {
    console.log("server is connected with the database")
}).catch((err) => {
    console.log(err)
})

let BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    blog: {
        type: String
    },
    date: { type: Date, default: Date.now },
})
const Blogmodel = mongoose.model("Blog", BlogSchema)

const contentSchema = mongoose.Schema({
    homecontent: String,
    aboutcontent: String,
    date: { type: Date, default: Date.now },
})
const contactSchema=mongoose.Schema({
    name:String,
    email:String,
    phone:{
        type:Number,
    },
    message:String,

    date: { type: Date, default: Date.now },
})

const contactModel=mongoose.model("ContactBlog",contactSchema)

const Contentmodel = mongoose.model("Content", contentSchema)

module.exports = {
    connect: promise,
    BlogSchema: BlogSchema,
    Blogmodel: Blogmodel,
    contentSchema: contentSchema,
    Contentmodel: Contentmodel,
    contactModel:contactModel

}



