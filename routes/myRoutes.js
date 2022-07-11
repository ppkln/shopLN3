const express = require("express")
const router = express.Router()
//const checkLogincontroller = require("../controllers/checkLogin-controller")
const addUsercontroller = require("../controllers/addUser-controller")


router.get("/addUser/:name&:pws",addUsercontroller)


router.get("/loginTest",(req,res)=>{
    res.render("loginForm")
})


module.exports = router