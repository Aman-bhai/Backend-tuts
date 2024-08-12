const mongoose=require("mongoose")
const url="mongodb://127.0.0.1:27017/Wikidb";

let promise=mongoose.connect(url,{useNewUrlParser:true}).then(()=>{
    console.log('server is connected with the database')
}).catch((err)=>{
    console.log(err)
})

let articleschema=mongoose.Schema({
    title:String,
    content:String
})

let articlemodel=mongoose.model("article",articleschema)


module.exports={
    connect:promise,
    articleschema:articleschema,
    articlemodel:articlemodel


}