const express = require("express")
const {register,login, getTickets} = require("../controllers/userController")
const { insertTrain, getTrains} = require("../controllers/trainController")
const {bookSeat} = require("../controllers/bookingController")
const {verifyJwtToken,verifyAdminKey} = require("../middleware/auth")
const router = express.Router()

router.post("/register",register)
router.post("/login",login)
router.post("/admin/insertTrain",verifyAdminKey,insertTrain)
router.get("/getTrains",verifyJwtToken,getTrains)
router.post("/bookSeat",verifyJwtToken,bookSeat)
router.get("/bookings/getTickets",verifyJwtToken,getTickets)

module.exports = router