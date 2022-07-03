const dotenv = require('dotenv').config();
const mysql = require('mysql');



// Database
const pool = mysql.createPool({
    connectionLimit: process.env.CON_LIMIT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    multipleStatements: true
  });
  

// Database
// const connection = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     database: process.env.DB_NAME,
//     multipleStatements: true
//   });
//   connection.connect((err) => {
//     if (err) throw err;
//     console.log('Connected to database.');
//   });





module.exports = pool;