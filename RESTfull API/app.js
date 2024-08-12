const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const ejs = require("ejs")
const path = require("path")

const mongo = require("./database")
const app = express()

app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }))
app.set("view engine", 'ejs')
app.set('views', path.join(__dirname, 'views'))

mongo.connect;
let article = mongo.articlemodel;

// app.get("/", (req, res) => {
//     res.send("hello")
// })

// app.get("/articles", (req, res) => {
//     article.find({}).then((articles) => {
//         res.send(articles);
//     }).catch((err) => {
//         console.log(err)
//         res.send(err)
//     })
//     // res.send("hello")
// })
// app.post("/articles", (req, res) => {
//     let title = req.body.title
//     let content = req.body.content
//     let newarticle = new article({
//         title: title,
//         content: content
//     })
//     newarticle.save().then(() => {
//         console.log('article saved successfully')
//     }).catch((err) => {

//         console.log('article is not saved')
//     })
//     res.send("hello")

// })

// app.delete("/articles",(req,res)=>{
//     article.deleteMany().then(()=>{
// console.log('All articles are deleted successfully')
//     }).catch((err)=>{
// console.log('Articles are not deleted',err)
//     })
//     res.send('deleted')
// })


app.route("/articles")
    .get((req, res) => {
        article.find({}).then((articles) => {
            res.send(articles);
        }).catch((err) => {
            console.log(err)
            res.send(err)
        })
    })
    .post((req, res) => {
        let title = req.body.title
        let content = req.body.content
        let newarticle = new article({
            title: title,
            content: content
        })
        newarticle.save().then(() => {
            console.log('article saved successfully')
        }).catch((err) => {

            console.log('article is not saved')
        })
        res.send("hello")
    })


    .delete((req, res) => {
        article.deleteMany().then(() => {
            console.log('All articles are deleted successfully')
        }).catch((err) => {
            console.log('Articles are not deleted', err)
        })
        res.send('deleted')
    })


//---------------------------------Targetting a specific article--------------------------------------------------//

app.route("/articles/:title").get((req, res) => {

    article.findOne({ title: req.params.title }).then((data) => {
        console.log(req.params.title)
        console.log(data)
        res.send(data)
    }).catch((err) => {
        console.log('article with this title does not exists')
    })
})
    .put((req, res) => {     // in put request we send whole article and set overwrite=true which we want to replace/update it
        console.log(req.body.title)
        console.log(req.body.content)
        console.log(req.params.title)
        article.find(
            { title: req.params.title }).then((data) => {
                article.updateOne({
                    title: req.body.title,
                    content: req.body.content
                }).then(() => {
                    console.log("article with this ", req.params.title, " is updated")
                    res.send(`article with this title ${req.params.title} is updated`)
                }).catch((err) => {
                    console.log(err)
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }).patch((req, res) => {
        let param = req.params.title;
        let title = req.body.title;
        let content = req.body.content;
        article.findOne({ title: param }).then((data) => {
            console.log(data)
            article.updateOne({ title: param }, { $set: { title: title, content: content } }).then((updatearticle) => {

                console.log(updatearticle)
                res.send(updatearticle)
            })
        })
    }).delete((req, res) => {
        let params = req.params.title;
        article.findOneAndDelete({ title: params }).then((articledelete) => {
            console.log('article is deleted', articledelete)
            res.send(`Document with this title (${params}) is deleted`)
        }).catch ((err) => {
            console.log(err)
        })
    })

app.listen(3000, () => {
    console.log('Server is listening at port 3000');
})