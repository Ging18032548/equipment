// const mysql = require('mysql');

// const connection = mysql.createConnection({
//     host: 'mysql_db', // ถ้าใน docker-compose.yml ใช้ชื่อบริการว่า mysql_db
//     user: 'root',
//     password: 'yourpassword',
//     database: 'yourdatabase'
// });

// connection.connect((err) => {
//   if (err) {
//     console.error('error connecting: ' + err.stack);
//     return;
//   }
//   console.log('connected as id ' + connection.threadId);
// });

// module.exports = connection;











// const mysql = require('mysql2');

// // ตั้งค่าการเชื่อมต่อ MySQL
// const db = mysql.createPool({
//     host: "localhost",
//     user: "root",   // แก้เป็น user ของคุณ
//     password: "",   // แก้เป็น password ของคุณ
//     database: "your_database", // เปลี่ยนเป็นชื่อฐานข้อมูล
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0
// });

// module.exports = db;

// const mysql = require('mysql2');

// // ตั้งค่าการเชื่อมต่อ MySQL
// const db = mysql.createPool({
//     host: 'localhost', // หรือ 127.0.0.1
//     user: 'root',      // ตรวจสอบ user ของ MySQL
//     password: 'password',      // ตรวจสอบ password ของ MySQL
//     database: 'webdb'  // ใช้ database ที่ถูกต้อง
// });







// const mysql = require("mysql2");
// const db = require('./webdb'); // Ensure this path is correct

// const connection = mysql.createConnection({
//     host: 'localhost', // หรือ IP ของ container MySQL
//     user: 'root', // ชื่อผู้ใช้ฐานข้อมูล
//     password: 'password', // รหัสผ่านฐานข้อมูล
//     database: 'webmanagement' // ชื่อฐานข้อมูล
// });

// connection.connect((err) => {
//     if (err) {
//         console.error("Error connecting to the database: ", err);
//         return;
//     }
//     console.log("Connected to the database!");
// });

// module.exports = connection;

// const mysql = require("mysql2");

// const dbConnection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'password',  // เปลี่ยนเป็นรหัสผ่านจริงของ MySQL
//     database: 'webdb' // เปลี่ยนชื่อฐานข้อมูลให้ตรงกับที่สร้างใน MySQL
// });

// dbConnection.connect((err) => {
//     if (err) {
//         console.error("Error connecting to the database:", err);
//         return;
//     }
//     console.log("Connected to the database!");
// });

// module.exports = dbConnection;
