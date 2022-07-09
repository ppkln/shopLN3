const express = require("express")
// const session = require("express-session")
// const cookieParser = require("cookie-parser")
const myRoute = require("./routes/myRoutes")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const app = express()

app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(myRoute)
// app.use(cookieParser())
// app.use(session({session:"mykeyforsession",resave:false,saveUninitialized:false}))

app.set("view engine","ejs")
app.set("views","views")

mongoose
    .connect("mongodb://localhost:27017/shopLN3",{useNewUrlParser:true,useUnifiedTopology:true}
    ).then(()=> console.log("Connected to MongoDB..."))
    .catch(err=>console.log("Cannot connect to MongoDB",err))


const port = process.env.port || 3000
app.listen(port,function(){
    console.log("connected to server on port:",port)
})