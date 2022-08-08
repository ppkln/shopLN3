// const users = require("../models/users")
// const bcrypt = require("bcryptjs")

// // login สร้างเพื่อเรียนรู้การใช้ session
// const checkLogin = (req,res,next)=>{
//     //คำสั่ง function ตรวจสอบข้อมูลผู้ใช้ในฐานข้อมูล
//     const checkUser = async dataObj =>{
//         const user = await users.findOne({
//             username : dataObj.username
//         })
//         if (!user){
//             return {id:null, username:null, loginStatus:false}
//         } else {
//             const result = await bcrypt.compare(dataObj.pws,user.password)
//             return {id:user._id, username:user.username, loginStatus:result}
//         }
//     }
//     //สิ้นสุดคำสั่ง function ตรวจสอบข้อมูลผู้ใช้ในฐานข้อมูล

//     console.log("username ที่กรอกใน form ",req.body.username)
//     console.log("password ที่กรอกใน form ",req.body.pws)
//     if (!req.body.username || !req.body.pws){
//         res.render("loginForm")
//         return
//     }
//     const dataObj = {
//         username:req.body.username,
//         pws : req.body.pws
//     }
//     checkUser(dataObj)
//     .then(result=>{
//         if(result.loginStatus==true){
//             //สร้าง session
//                 req.session.userId = result.id
//                 req.session.usernameLN = result.username
//                 req.session.loginStatus = result.loginStatus
//                 req.session.position = "admin"
//                 req.session.cookie.maxAge= 120000 //อายุของ session
//             //--
//             console.log(req.session.usernameLN)
//             console.log("Login ผ่าน")
//             console.log(req.session)
//             res.render("home",{data:{
//                 message:"ผ่านการ Login แล้ว",
//                 idUser: req.session.userId,
//                 sessionName:req.session.usernameLN,
//                 loginStatus:req.session.loginStatus
//             }})
//         } else{
//             console.log("Login ไม่ผ่าน",result.loginStatus)
//             res.render("loginForm")
//         }
//     })
//     .catch(err=>{
//         console.log(err)
//     })
// }
// //---

// module.exports = checkLogin