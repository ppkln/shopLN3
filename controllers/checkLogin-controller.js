const users = require("../models/users")
const bcrypt = require("bcryptjs")

    //คำสั่ง function ตรวจสอบข้อมูลผู้ใช้ในฐานข้อมูล
    const checkUser = async dataObj =>{
        const user = await users.findOne({
            username : dataObj.username
        })
        if (!user){
            return {id:null, username:null, loginStatus:false}
        } else {
            //const result = await bcrypt.compare(dataObj.pws,users.password)
            const result  = await users.findOne({
                username : dataObj.pws
            })
            return {id:users._id, username:users.username, loginStatus:true}
        }
    }
    //สิ้นสุดคำสั่ง function ตรวจสอบข้อมูลผู้ใช้ในฐานข้อมูล

const checkLogin = (req,res,next)=>{
    console.log("username ที่กรอก ",req.body.username)
    console.log("password ที่กรอก ",req.body.pws)
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
            console.log("Login ผ่าน",result.loginStatus)
            res.render("home")
        } else{
            console.log("Login ไม่ผ่าน",result.loginStatus)
            res.render("loginForm")
        }
    })
    .catch(err=>{
        console.log(err)
    })
}

module.exports = checkLogin