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
    secret: "secrctekeysessionLN",
    resave: true,
    saveUninitialized: true
}))

app.set("view engine","ejs")
app.set("views","views")

app.get("/",(req,res)=>{
    if (req.session.loginStatus){
        res.render("home",{data:{
            message:"ผ่านการ Login แล้ว",
            idUser: req.session.userId,
            sessionName:"คุณ "+req.session.usernameLN,
            loginStatus:req.session.loginStatus
        }})
    } else {
        res.render("home",{data:{
            message:"",
            idUser: "",
            sessionName:"",
            loginStatus:false
        }})
    }
})
// login method
app.get("/login",(req,res)=>{
    if(req.session.loginStatus){
        res.render("home",{data:{
            message:"ผ่านการ Login แล้ว",
            idUser: req.session.userId,
            sessionName:"คุณ "+req.session.usernameLN,
            loginStatus:req.session.loginStatus
        }})
    } else {
        res.render("loginForm",{data:{
            message:null,
            idUser:null,
            sessionName:null,
            loginStatus:false
        }})
    }
})
// logout method
app.get("/logout",(req,res)=>{
    req.session.destroy();
    res.render("home",{data:{
        message:"ทำการ Logout สำเร็จ",
        idUser:null,
        sessionName:null,
        loginStatus:false
    }})
})


//เพื่อเข้าดูข้อมูล session 
app.get('/session', (req, res) => {
    let sess = req.session
    console.log("จากหน้า/session: ",sess)
    res.status(200).send("username = " + sess.usernameLN)
  })
//จบเพื่อเข้าดูข้อมูล session 


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
        res.render("loginForm",{data:{
            message:null,
            idUser:null,
            sessionName:null,
            loginStatus:false
        }})
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
                req.session.cookie.maxAge= 120000 //อายุของ session
            //--
            console.log("Login ผ่าน")
            console.log("จากฟังก์ชันcheckUser: ",req.session)
            res.render("home",{data:{
                message:"ผ่านการ Login แล้ว",
                idUser: req.session.userId,
                sessionName:"คุณ "+req.session.usernameLN,
                loginStatus:req.session.loginStatus
            }})
        } else{
            console.log("Login ไม่ผ่าน",result.loginStatus)
            res.render("loginForm",{data:{
                message:null,
                idUser:null,
                sessionName:null,
                loginStatus:false
            }})
        }
    })
    .catch(err=>{
        console.log(err)
    })
})
//---

mongoose
    .connect("mongodb://localhost:27017/shopLN3",{useNewUrlParser:true,useUnifiedTopology:true}
    ).then(()=> console.log("Connected to MongoDB..."))
    .catch(err=>console.log("Cannot connect to MongoDB",err))


const port = process.env.port || 3000
app.listen(port,function(){
    console.log("connected to server on port:",port)
})

// ข้อสังเกต ขอบเขตของตัวแปร session ที่สามารถทำงานได้คือภายในไฟล์ app.js  เท่านั้น  ทดลองเอาคำสั่งเกี่ยวกับ session ไปไว้ที่ไฟล์ myRoutes.jsและไฟล์ประเภท .ejs 
// ผลที่ได้คือทำงานไม่ได้ มีแจ้ง error ที่คำสั่ง session ดังกล่าว