const db = require("../config/database")

exports.insertTrain = async (req, res) => {
    const { source, destination, totalSeats } = req.body
    try {
        await db.query(`INSERT INTO trains (source, destination, totalSeats, availableSeats) VALUES (?, ?, ?, ?)`, [source, destination, totalSeats, totalSeats])
        res.status(201).json({ message: "Train added successfully" })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.getTrains = async (req, res) => {
    const { source, destination } = req.body
    try {
        const [availableTrains] = await db.query(`SELECT * FROM trains WHERE source = ? AND destination = ?`, [source, destination])
        if (availableTrains.length == 0) {
            return res.status(404).json({ message: "No Trains Found" })
        }
        res.json(availableTrains)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
