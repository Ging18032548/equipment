const express = require('express');
const mysql = require('mysql');
const app = express();
const PORT = 8080;

// Setup database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Use your MySQL password
    database: 'webdb', // Use your database name
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to database');
});

// Example route to fetch data
app.get('/api/data', (req, res) => {
    const sql = 'SELECT * FROM your_table_name'; // Replace with your table name
    db.query(sql, (err, results) => {
        if (err) {
            res.status(500).send('Database query failed');
            throw err;
        }
        res.json(results); // Return data as JSON
    });
});

// Route to verify database connection
app.get('/api/verify', (req, res) => {
    db.query('SELECT 1', (err) => {
        if (err) {
            res.status(500).send('Database connection verification failed');
            return;
        }
        res.send('Database connection is active');
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// last update: 2021-09-29
// const express = require('express');
// const mysql = require('mysql2');
// const cors = require('cors');

// const app = express();
// const port = 8880; // ใช้พอร์ต 8880

// app.use(cors());
// app.use(express.json());

// // สร้างการเชื่อมต่อกับฐานข้อมูล MySQL
// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',  // เปลี่ยนเป็นรหัสผ่านจริงของ MySQL
//     database: 'webdb'      // เปลี่ยนชื่อฐานข้อมูลให้ตรงกับที่สร้างใน MySQL
// });

// // เชื่อมต่อกับฐานข้อมูล
// db.connect((err) => {
//     if (err) {
//         console.error("Error connecting to the database:", err);
//         return;
//     }
//     console.log("Connected to the database!");
// });

// // เส้นทางสำหรับหน้าแรก
// app.get('/', (req, res) => {
//     res.send('Welcome to the server!');
// });

// // สร้าง API สำหรับดึงข้อมูลจากตาราง borrow_record
// app.get('/api/borrow_records', async (req, res) => {
//     try {
//         const [results] = await db.promise().query('SELECT * FROM borrow_record');
//         res.json(results);  // ส่งข้อมูลเป็น JSON
//     } catch (err) {
//         res.status(500).send({ error: 'Database error' });
//     }
// });

// // API ที่ดึงข้อมูลจากตาราง 'equipment'
// app.get('/api/equipment', async (req, res) => {
//     try {
//         const [results] = await db.promise().query('SELECT * FROM equipment');
//         res.json(results);  // ส่งข้อมูลเป็น JSON
//     } catch (err) {
//         res.status(500).send({ error: 'Database error' });
//     }
// });

// // Dashboard
// app.get("/dashboard", async (req, res) => {
//     try {
//         const [result] = await db.promise().query("SELECT * FROM dashboard_id LIMIT 1");
//         res.json({ success: true, data: result[0] });
//     } catch (err) {
//         res.status(500).json({ success: false, message: err.message });
//     }
// });

// // เริ่มต้นเซิร์ฟเวอร์ที่พอร์ต 8880
// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });


// const express = require('express');
// const cors = require('cors');
// const db = require('./db'); // ไฟล์ที่เชื่อมต่อกับฐานข้อมูล

// const app = express();
// app.use(cors()); // เปิดใช้งาน CORS
// app.use(express.json()); // ใช้ JSON parser สำหรับ body

// // ดึงข้อมูลจาก borrow_records
// app.get('/borrow_records', async (req, res) => {
//     try {
//         const [rows] = await db.query('SELECT * FROM borrow_records');
//         res.json(rows); // ส่งข้อมูลในรูปแบบ JSON
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// // เปิด server บน port 8880
// app.listen(8880, () => {
//     console.log('Server is running on http://localhost:8880');
// });

// const express = require('express');
// const mysql = require('mysql');
// const app = express();
// const port = 8880;

// // สร้างการเชื่อมต่อกับฐานข้อมูล MySQL
// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'your_username',
//     password: 'your_password',
//     database: 'your_database_name'
// });

// // เชื่อมต่อกับฐานข้อมูล
// db.connect((err) => {
//     if (err) {
//         console.log('Error connecting to the database:', err.stack);
//         return;
//     }
//     console.log('Connected to the database');
// });

// // สร้าง API สำหรับดึงข้อมูลจากตาราง borrow_record
// app.get('/api/borrow_records', (req, res) => {
//     db.query('SELECT * FROM borrow_record', (err, results) => {
//         if (err) {
//             res.status(500).send({ error: 'Database error' });
//             return;
//         }
//         res.json(results);  // ส่งข้อมูลเป็น JSON
//     });
// });

// // เริ่มต้นเซิร์ฟเวอร์
// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });
