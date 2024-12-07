const db = require("../config/database")

exports.bookSeat = async (req, res) => {
    const { userId,trainId } = req.body
    const con = await db.getConnection()
    try {
        await con.beginTransaction()
        const [train] = await con.query(`SELECT * FROM trains WHERE id = ? FOR UPDATE`, [trainId])
        if (!train.length || train[0].availableSeats <= 0) {
            await con.rollback();
            return res.status(400).json({ error: 'No seats available' });
        }
        await con.query(`UPDATE trains SET availableSeats = availableSeats - 1 WHERE id = ?`, [trainId]);
        await con.query(`INSERT INTO bookings (userId, trainId) VALUES (?, ?)`, [userId, trainId])
        await con.commit()
        res.status(200).json({ message: 'Seat booked successfully' })
    } catch (error) {
        await con.rollback()
        res.status(500).json({ error: error.message })
    } finally {
        con.release()
    }
}