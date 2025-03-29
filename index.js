const express = require('express');
const cors = require('cors'); // ป้องกัน CORS error
const db = require('./db');

const app = express();

app.use(express.json()); // ✅ อ่าน JSON ที่ส่งมาทาง `req.body`
app.use(cors()); // ✅ เปิดให้ client อื่นเรียก API ได้

// --------------------- 📌 EQUIPMENT ---------------------
// 📌 ดึงข้อมูล Equipment ทั้งหมด
app.get('/equipment', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM equipment');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 📌 เพิ่ม Equipment
app.post('/equipment', (req, res) => {
    const { name, category, status } = req.body;
    const sql = "INSERT INTO equipment (name, category, status) VALUES (?, ?, ?)";
    db.query(sql, [name, category, status], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Equipment added successfully!", id: result.insertId });
    });
});

// 📌 อัปเดต Equipment
app.put('/equipment/:id', (req, res) => {
    const { name, category, status } = req.body;
    const sql = "UPDATE equipment SET name=?, category=?, status=? WHERE id=?";
    db.query(sql, [name, category, status, req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Equipment updated successfully!" });
    });
});

// 📌 ลบ Equipment
app.delete('/equipment/:id', (req, res) => {
    const sql = "DELETE FROM equipment WHERE id=?";
    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Equipment deleted successfully!" });
    });
});

// --------------------- 📌 BORROW RECORDS ---------------------
app.get('/borrow_records', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM borrow_records');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/borrow_records', (req, res) => {
    const { user_id, equipment_id, borrow_date, return_date, status } = req.body;
    const sql = "INSERT INTO borrow_records (user_id, equipment_id, borrow_date, return_date, status) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [user_id, equipment_id, borrow_date, return_date, status], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Borrow record added!", id: result.insertId });
    });
});

app.put('/borrow_records/:id', (req, res) => {
    const { user_id, equipment_id, borrow_date, return_date, status } = req.body;
    const sql = "UPDATE borrow_records SET user_id=?, equipment_id=?, borrow_date=?, return_date=?, status=? WHERE id=?";
    db.query(sql, [user_id, equipment_id, borrow_date, return_date, status, req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Borrow record updated!" });
    });
});

app.delete('/borrow_records/:id', (req, res) => {
    const sql = "DELETE FROM borrow_records WHERE id=?";
    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Borrow record deleted!" });
    });
});

// --------------------- 📌 MAINTENANCE ---------------------
app.get('/maintenance', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM maintenance');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/maintenance', (req, res) => {
    const { equipment_id, maintenance_date, description, repair, cost } = req.body;
    const sql = "INSERT INTO maintenance (equipment_id, maintenance_date, description, repair, cost) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [equipment_id, maintenance_date, description, repair, cost], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Maintenance record added!", id: result.insertId });
    });
});

app.put('/maintenance/:id', (req, res) => {
    const { equipment_id, maintenance_date, description, repair, cost } = req.body;
    const sql = "UPDATE maintenance SET equipment_id=?, maintenance_date=?, description=?, repair=?, cost=? WHERE id=?";
    db.query(sql, [equipment_id, maintenance_date, description, repair, cost, req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Maintenance record updated!" });
    });
});

app.delete('/maintenance/:id', (req, res) => {
    const sql = "DELETE FROM maintenance WHERE id=?";
    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Maintenance record deleted!" });
    });
});

// --------------------- 📌 USERS ---------------------
app.get('/users', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM users');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/users', (req, res) => {
    const { username, password, role } = req.body;
    const sql = "INSERT INTO users (username, password, role) VALUES (?, ?, ?)";
    db.query(sql, [username, password, role], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "User added!", id: result.insertId });
    });
});

app.put('/users/:id', (req, res) => {
    const { username, password, role } = req.body;
    const sql = "UPDATE users SET username=?, password=?, role=? WHERE id=?";
    db.query(sql, [username, password, role, req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "User updated!" });
    });
});

app.delete('/users/:id', (req, res) => {
    const sql = "DELETE FROM users WHERE id=?";
    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "User deleted!" });
    });
});

// 📌 เปิด Server บน Port 8880
app.listen(8880, () => {
    console.log('✅ Server is running on http://localhost:8880');
});
