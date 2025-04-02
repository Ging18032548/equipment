const express = require('express');
const cors = require('cors'); 
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');


const port = 8880; // Change to a different port, e.g., 8881 or 3000

const app = express();
app.use(express.json());
app.use(cors());


let conn = null;
const db = async () => {
    conn = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'webdb',
        port: 8880
    });

}

db.connect((err) => {
    if (err) {
        console.error("Error connecting to the database:", err);
        return;
    }
    console.log("Connected to the database!");
});

app.get('/', (req, res) => {
    res.send('Welcome to the server!');
})

// สร้างข้อมูลในตาราง equipment
app.post('/equipment', async (req, res) => {
    const { name, category, status } = req.body;
    try {
        const sql = "INSERT INTO equipment (name, category, status) VALUES (?, ?, ?)";
        const [result] = await db.execute(sql, [name, category, status]);
        res.json({ message: "Equipment added successfully!", id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: 'Error adding equipment: ' + err.message });
    }
});


// equipment
app.get('/equipment', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM equipment');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching equipment: ' + err.message });
    }
});

app.put('/equipment/:id', async (req, res) => {
    const { name, category, status } = req.body;
    try {
        const sql = "UPDATE equipment SET name=?, category=?, status=? WHERE id=?";
        await db.execute(sql, [name, category, status, req.params.id]);
        res.json({ message: "Equipment updated successfully!" });
    } catch (err) {
        res.status(500).json({ error: 'Error updating equipment: ' + err.message });
    }
});

app.delete('/equipment/:id', async (req, res) => {
    try {
        const sql = "DELETE FROM equipment WHERE id=?";
        await db.execute(sql, [req.params.id]);
        res.json({ message: "Equipment deleted successfully!" });
    } catch (err) {
        res.status(500).json({ error: 'Error deleting equipment: ' + err.message });
    }
});

// borrow_records
app.get('/borrow_records', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM borrow_records');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching borrow records: ' + err.message });
    }
});

app.post('/borrow_records', async (req, res) => {
    const { user_id, equipment_id, borrow_date, return_date, status } = req.body;
    try {
        const sql = "INSERT INTO borrow_records (user_id, equipment_id, borrow_date, return_date, status) VALUES (?, ?, ?, ?, ?)";
        const [result] = await db.execute(sql, [user_id, equipment_id, borrow_date, return_date, status]);
        res.json({ message: "Borrow record added!", id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: 'Error adding borrow record: ' + err.message });
    }
});

app.put('/borrow_records/:id', async (req, res) => {
    const { user_id, equipment_id, borrow_date, return_date, status } = req.body;
    try {
        const sql = "UPDATE borrow_records SET user_id=?, equipment_id=?, borrow_date=?, return_date=?, status=? WHERE id=?";
        await db.execute(sql, [user_id, equipment_id, borrow_date, return_date, status, req.params.id]);
        res.json({ message: "Borrow record updated!" });
    } catch (err) {
        res.status(500).json({ error: 'Error updating borrow record: ' + err.message });
    }
});

app.delete('/borrow_records/:id', async (req, res) => {
    try {
        const sql = "DELETE FROM borrow_records WHERE id=?";
        await db.execute(sql, [req.params.id]);
        res.json({ message: "Borrow record deleted!" });
    } catch (err) {
        res.status(500).json({ error: 'Error deleting borrow record: ' + err.message });
    }
});

// maintenance
app.get('/maintenance', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM maintenance');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching maintenance records: ' + err.message });
    }
});

app.post('/maintenance', async (req, res) => {
    const { equipment_id, maintenance_date, description, repair, cost } = req.body;
    try {
        const sql = "INSERT INTO maintenance (equipment_id, maintenance_date, description, repair, cost) VALUES (?, ?, ?, ?, ?)";
        const [result] = await db.execute(sql, [equipment_id, maintenance_date, description, repair, cost]);
        res.json({ message: "Maintenance record added!", id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: 'Error adding maintenance record: ' + err.message });
    }
});

app.put('/maintenance/:id', async (req, res) => {
    const { equipment_id, maintenance_date, description, repair, cost } = req.body;
    try {
        const sql = "UPDATE maintenance SET equipment_id=?, maintenance_date=?, description=?, repair=?, cost=? WHERE id=?";
        await db.execute(sql, [equipment_id, maintenance_date, description, repair, cost, req.params.id]);
        res.json({ message: "Maintenance record updated!" });
    } catch (err) {
        res.status(500).json({ error: 'Error updating maintenance record: ' + err.message });
    }
});

app.delete('/maintenance/:id', async (req, res) => {
    try {
        const sql = "DELETE FROM maintenance WHERE id=?";
        await db.execute(sql, [req.params.id]);
        res.json({ message: "Maintenance record deleted!" });
    } catch (err) {
        res.status(500).json({ error: 'Error deleting maintenance record: ' + err.message });
    }
});

//  user
app.get('/users', async (req, res) => {
    try {
        const [rows] = await db.execute(
            'SELECT id, username, firstname, lastname, email, phone, department, role FROM user'
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching users: ' + err.message });
    }
});

app.post('/users', async (req, res) => {
    const { username, password, role } = req.body;
    try {
        const sql = "INSERT INTO users (username, password, role) VALUES (?, ?, ?)";
        const [result] = await db.execute(sql, [username, password, role]);
        res.json({ message: "User added!", id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: 'Error adding user: ' + err.message });
    }
});

app.put('/users/:id', async (req, res) => {
    const { username, password, role } = req.body;
    try {
        const sql = "UPDATE users SET username=?, password=?, role=? WHERE id=?";
        await db.execute(sql, [username, password, role, req.params.id]);
        res.json({ message: "User updated!" });
    } catch (err) {
        res.status(500).json({ error: 'Error updating user: ' + err.message });
    }
});

app.delete('/users/:id', async (req, res) => {
    try {
        const sql = "DELETE FROM users WHERE id=?";
        await db.execute(sql, [req.params.id]);
        res.json({ message: "User deleted!" });
    } catch (err) {
        res.status(500).json({ error: 'Error deleting user: ' + err.message });
    }
});

// เปิด Server บน Port 8880
// app.listen(8880, () => {
//     console.log('✅ Server is running on http://localhost:8880');
// });

const PORT = 8880; // Change to a different port, e.g., 8881 or 3000
app.listen(PORT, (req, res) => {
  console.log(`Http Server is running on port ${PORT}`);
});


// // สร้างการเชื่อมต่อกับฐานข้อมูล MySQL
// const db = mysql.createConnection({
//     host: 'localhost',

