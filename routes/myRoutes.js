const express = require("express")
const router = express.Router()
const checkLogincontroller = require("../controllers/checkLogin-controller")
const addUsercontroller = require("../controllers/addUser-controller")

router.get("/",(req,res)=>{
    res.render("home")
})
router.get("/addUser/:name&:pws",addUsercontroller)
router.get("/login",(req,res)=>{
    res.render("loginForm")
})
router.post("/loginCheck",checkLogincontroller)

module.exports = router