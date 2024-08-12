const express = require('express')
const bodyparser = require('body-parser')
const path = require('path')


const app = express()

app.use(bodyparser.urlencoded({ extended: true }))
app.use(express.static("public"))
app.set("view engine", "ejs")
app.set("views", path.join(__dirname + "/views"))

let homecontent = "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium sint exercitationem, magni delectus corporis labore officia fugit voluptatem aliquid nesciunt adipisci obcaecati pariatur itaque ut, ab harum architecto doloremque beatae neque repellat cumque voluptate blanditiis? Temporibus culpa, inventore harum velit fugiat, saepe qui ex, necessitatibus officiis expedita fuga ipsam corrupti.";

let aboutcontent = "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium sint exercitationem, magni delectus corporis labore officia fugit voluptatem aliquid nesciunt adipisci obcaecati pariatur itaque ut, ab harum architecto doloremque beatae neque repellat cumque voluptate blanditiis? Temporibus culpa, inventore harum velit fugiat, saepe qui ex, necessitatibus officiis expedita fuga ipsam corrupti.";


let posts = [{title:'Day-1',blog:'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium sint exercitationem, magni delectus corporis labore officia fugit voluptatem aliquid nesciunt adipisci obcaecati pariatur itaque ut, ab harum architecto doloremque beatae neque repellat cumque voluptate blanditiis? Temporibus culpa, inventore harum velit fugiat, saepe qui ex, necessitatibus officiis expedita fuga ipsam corrupti.'}];
let contacts=[];

app.get('/', (req, res) => {
    res.render('home',{homecontent: homecontent,posts:posts})
});



app.get('/about', (req, res) => {
    res.render('about', {aboutcontent:aboutcontent })
});





app.get('/blog', (req, res) => {
    res.render('blog',{homecontent: homecontent})
});

app.post('/blog', (req, res) => {
    const post = {
        title: req.body.title,
        blog: req.body.blog
    };
    
    posts.push(post)
    console.log(posts)
    res.redirect("/")
});


app.get("/posts/:postName", (req, res)=>{
    const title=req.params.postName;
    console.log(title)
    posts.forEach((element)=>{
        if(title===element.title)
        {
            console.log(element.title)
            console.log(element.blog)
            res.render("post",{
                title:title,
                blog:element.blog
            })
            
        }
    })
    res.render("post")
})


app.get('/contact', (req, res) => {
    res.render('contact')
});


app.post('/contact', (req, res) => {
    const contact = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        message: req.body.message

    }


    console.log(contact)
    contacts.push(contact);
    res.redirect("contact")
})


app.listen(800, () => {
    console.log('Server is Listening at http://localhost:800');
})