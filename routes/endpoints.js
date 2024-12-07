const express = require("express")
const {register,login, getTickets} = require("../controllers/userController")
const { insertTrain, getTrains} = require("../controllers/trainController")
const {bookSeat} = require("../controllers/bookingController")
const {verifyJwtToken,verifyAdminKey} = require("../middleware/auth")
const router = express.Router()

router.post("/register",register)
router.post("/login",login)
router.post("/insertTrain",verifyAdminKey,insertTrain)
router.post("/getTrains",verifyJwtToken,getTrains)
router.post("/bookSeat",verifyJwtToken,bookSeat)
router.post("/getTickets",verifyJwtToken,getTickets)

module.exports = router