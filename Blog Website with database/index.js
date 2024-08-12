const express = require('express')
const bodyparser = require('body-parser')
const path = require('path')
const mongo = require("./database")
const app = express()

app.use(bodyparser.urlencoded({ extended: true }))
app.use(express.static("public"))
app.set("view engine", "ejs")
app.set("views", path.join(__dirname + "/views"))


const homecontent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam voluptatum ducimus quidem laudantium ipsum ullam deserunt repudiandae ratione quo numquam explicabo dolor ut mollitia voluptatem, ipsa hic maxime libero pariatur."


const aboutcontent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam voluptatum ducimus quidem laudantium ipsum ullam deserunt repudiandae ratione quo numquam explicabo dolor ut mollitia voluptatem, ipsa hic maxime libero pariatur."

mongo.connect   // mongo.connect is come from database.js

let Blogmodel = mongo.Blogmodel;
let contact = mongo.contactModel;

app.get('/', (req, res) => {

    let post = new Blogmodel({
        title: 'Day-1',
        blog: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium sint exercitationem, magni delectus corporis labore officia fugit voluptatem aliquid nesciunt adipisci obcaecati pariatur itaque ut, ab harum architecto doloremque beatae neque repellat cumque voluptate blanditiis? Temporibus culpa, inventore harum velit fugiat, saepe qui ex, necessitatibus officiis expedita fuga ipsam corrupti.'
    })

    Blogmodel.find({}).then((data) => {
        // console.log(data)
        if (data.length === 0) {
            Blogmodel.insertMany(post).then(() => {
                console.log('Default data is saved in database')
            }).catch((err) => {
                console.log(err)
            })
            res.redirect("/")
        }
        else {
            res.render('home', { homecontent: homecontent, posts: data })
        }
    }).catch((err) => {
        console.log(err)
    })


});



app.get('/about', (req, res) => {
    res.render('about', { aboutcontent: aboutcontent })
});





app.get('/blog', (req, res) => {
    res.render('blog', { homecontent: homecontent })
});

app.post('/blog', (req, res) => {
    let post = new Blogmodel({
        title: req.body.title,
        blog: req.body.blog
    });
    post.save()
    res.redirect("/")
});


app.get("/posts/:postName", (req, res) => {
    let title = req.params.postName;

    // console.log(title)

    Blogmodel.findOne({ title: title }).then((bloglist) => {
        // console.log(bloglist)
        if (bloglist) {
            res.render("post", {
                title: bloglist.title,
                blog: bloglist['blog']
            })
        }
        else {
            res.render("post", { title: `${title} does not exists in Database`, blog: "No Data found" })

        }
    }).catch((err) => {
        console.log(err)
    })
})


app.get('/contact', (req, res) => {
    res.render('contact')
});


app.post('/contact', (req, res) => {
    let contacts = new contact({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        message: req.body.message

    })
    contacts.save()
    res.redirect("/contact")
})

app.post("/delete", (req, res) => {
    let title = req.body.del;
    Blogmodel.findOne({ title: title }).then((data) => {
        if (data.title === title) {
            let deleteid = data._id;
            Blogmodel.deleteOne({ _id: deleteid }).then(() => {
                console.log("Successfully deleted")
                res.redirect("/")
            }).catch((err) => {
                console.log("Blog is not deleted", err)
                res.send("Your Blog is not deleted due to internal server error")
            })
        }
    }).catch((err) => {
        console.log(err)
    })


})


app.get("/blogupdate/:title", (req, res) => {
    let title = req.params.title
    Blogmodel.findOne({ title: title }).then((datalist) => {
        console.log(datalist.title)
        if (title === datalist.title) {
            title = datalist.title,
                blog = datalist.blog,
                res.render("update", { title: title, blog: blog })
        }
    })
})
app.post("/update", (req, res) => {
    let title = req.body.title;
    let blog = req.body.blog;
    let prevtitle=req.body.prevtitle;
    console.log(req.body)
    Blogmodel.findOne({ title: prevtitle }).then((data) => {
        if (data.title === prevtitle) {
            let id=data._id;
            Blogmodel.findByIdAndUpdate(id,{ $set: {title:title,blog:blog }}).then((updatedata) => {
            console.log('Blog is Updated in the database')
                res.redirect("/")
            }).catch((err) => {
                console.log(err)
            })
        }
    }).catch((err) => {
        console.log(err)
    })
})

app.listen(800, () => {
    console.log(`Server is Listening at http://localhost:800)`);
})