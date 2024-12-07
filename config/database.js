const mysql = require("mysql2/promise")
require('dotenv').config()

const db = mysql.createPool({
    port:process.env.DB_PORT,
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
    connectionLimit:10,
    waitForConnections:true,
})

module.exports = db