const express = require("express")
const app = express()
const session = require("express-session")
const cookieParser = require("cookie-parser")
const myRoute = require("./routes/myRoutes")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const users = require("./models/users")
const bcrypt = require("bcryptjs")



app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(myRoute)
app.use(cookieParser())
app.use(session({
    secret: "secrctekeysession",
    resave: false,
    saveUninitialized: true
}))

app.set("view engine","ejs")
app.set("views","views")

app.get("/logout",(req,res)=>{
    req.session.destroy((err)=>{
        console.log("ค่าของ session ",req.session)
        res.render("loginForm")
    })
})

// login สร้างเพื่อเรียนรู้การใช้ session
app.post("/signin",(req,res,next)=>{
    //คำสั่ง function ตรวจสอบข้อมูลผู้ใช้ในฐานข้อมูล
    const checkUser = async dataObj =>{
        const user = await users.findOne({
            username : dataObj.username
        })
        if (!user){
            return {id:null, username:null, loginStatus:false}
        } else {
            const result = await bcrypt.compare(dataObj.pws,user.password)
            return {id:user._id, username:user.username, loginStatus:result}
        }
    }
    //สิ้นสุดคำสั่ง function ตรวจสอบข้อมูลผู้ใช้ในฐานข้อมูล

    console.log("username ที่กรอกใน form ",req.body.username)
    console.log("password ที่กรอกใน form ",req.body.pws)
    if (!req.body.username || !req.body.pws){
        res.render("loginForm")
        return
    }
    const dataObj = {
        username:req.body.username,
        pws : req.body.pws
    }
    checkUser(dataObj)
    .then(result=>{
        if(result.loginStatus==true){
            //สร้าง session
                req.session.userId = result.id
                req.session.usernameLN = result.username
                req.session.loginStatus = result.loginStatus
                req.session.position = "admin"
                req.session.cookie.maxAge= 120000 //อายุของ session
            //--
            console.log("Login ผ่าน")
            console.log(req.session)
            res.render("home")
        } else{
            console.log("Login ไม่ผ่าน",result.loginStatus)
            res.render("loginForm")
        }
    })
    .catch(err=>{
        console.log(err)
    })
})
//---



//เพื่อเข้าดูข้อมูล session 
app.get('/session', (req, res) => {
    let sess = req.session
    console.log(sess)
    res.status(200).send("username = " + sess.username)
  })
//จบเพื่อเข้าดูข้อมูล session 

mongoose
    .connect("mongodb://localhost:27017/shopLN3",{useNewUrlParser:true,useUnifiedTopology:true}
    ).then(()=> console.log("Connected to MongoDB..."))
    .catch(err=>console.log("Cannot connect to MongoDB",err))


const port = process.env.port || 3000
app.listen(port,function(){
    console.log("connected to server on port:",port)
})