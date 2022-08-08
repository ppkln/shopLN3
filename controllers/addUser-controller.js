// const bcrypt = require("bcryptjs")
// const users = require("../models/users")
//     //สร้างfunctionเพิ่มผู้ใช้ ทิ้งไว้
//     const createUser = async userObj =>{
//         const hash = await bcrypt.hash(userObj.pws,10)
//         let user = new users({
//             username : userObj.username,
//             password : hash
//         })
//         const data = await user.save()
//         return data
//     }
//     //สิ้นสุดคำสั่ง function เพิ่มผู้ใช้

// const addUser = (req,res,next)=>{
//     const username = req.params.name
//     const password = req.params.pws
//     let userObj = {
//         username:username,
//         pws : password
//     }
//     //เรียกใช้ function เพิ่มผู้ใช้ ที่ส้รางไว้
//     createUser(userObj)
//     .then(()=>{
//         console.log("เพิ่มข้อมูลผู้ใช้สำเร็จ")
//         res.render("200addUser")
//     })
//     .catch(err=>{
//         console.log("บันทึกข้อมูลผู้ใช้ไม่สำเร็จ")
//         res.render("401")
//     })
// }

// module.exports = addUser