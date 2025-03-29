const express = require('express');
const cors = require('cors');
const db = require('./db'); // ไฟล์ที่เชื่อมต่อกับฐานข้อมูล

const app = express();
app.use(cors()); // เปิดใช้งาน CORS
app.use(express.json()); // ใช้ JSON parser สำหรับ body

// ดึงข้อมูลจาก borrow_records
app.get('/borrow_records', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM borrow_records');
        res.json(rows); // ส่งข้อมูลในรูปแบบ JSON
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// เปิด server บน port 8880
app.listen(8880, () => {
    console.log('Server is running on http://localhost:8880');
});
