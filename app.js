const express = require("express")
require('dotenv').config()
const routes = require("./routes/endpoints")
const db = require("./config/database")
const app = express()
app.use(express.json())
app.use("/api",routes)
app.get("/",async(req,res)=>{
    let userName = "Guest"
    const token = req.headers.token
    const {userId} = req.body
    if(token){
        const [user] = await db.query(`SELECT * FROM users WHERE id = ?`,[userId])
        userName = user[0].username
    }
    res.json({title:"Railway Ticket Booking",message:`Welcome, ${userName}`})
})
app.listen(process.env.APP_PORT,()=>{
    console.log("SERVER IS UP AT:",process.env.APP_PORT)
})