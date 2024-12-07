const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require("../config/database")

exports.register = async(req,res) => {
    const {username,password,role} = req.body
    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        await db.query(`INSERT INTO users (username, password, role) VALUES (?, ?, ?)`, [username, hashedPassword, role])
        res.status(201).json({message: 'User registered successfully.'})
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.login = async (req, res) => {
    const { username, password } = req.body
    try {
      const [rows] = await db.query(`SELECT * FROM users WHERE username = ?`, [username])
      if (rows.length === 0 || !(await bcrypt.compare(password, rows[0].password))) {
        return res.status(401).json({ error: 'Invalid credentials' })
      }
      const token = jwt.sign({ id: rows[0].id, role: rows[0].role }, process.env.JWT_SECRET, { expiresIn: '1h' })
      res.json({ message: 'Login successful', token })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
};

exports.getTickets = async(req,res) => {
  const {userId} = req.body
  const [tickets] = await db.query(`SELECT * FROM bookings WHERE userId = ?`,[userId])
  if (tickets.length === 0){
    return res.status(200).json({message:"No Tickets Booked Yet!"})
  }
  res.json(tickets)
}