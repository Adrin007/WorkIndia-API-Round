const jwt = require("jsonwebtoken")

exports.verifyJwtToken = (req, res, next) => {
    const jwtToken = req.headers.token
    if (!jwtToken) {
        return res.status(401).json({ message: "Insert the JWT token" })
    }
    jwt.verify(jwtToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err){
            return res.status(401).json({ error: 'Invalid token' })
        } 
        req.user = decoded
        next()
    })
}
exports.verifyAdminKey = (req, res, next) => {
    const apiKey = req.headers.adminKey
    if (apiKey !== process.env.ADMIN_API_KEY) {
        return res.status(403).json({ error: 'Invalid API key' })
    }
    next()
};