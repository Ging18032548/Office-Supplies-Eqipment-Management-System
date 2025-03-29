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

const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 8880;

// สร้างการเชื่อมต่อกับฐานข้อมูล MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'your_username',
    password: 'your_password',
    database: 'your_database_name'
});

// เชื่อมต่อกับฐานข้อมูล
db.connect((err) => {
    if (err) {
        console.log('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the database');
});

// สร้าง API สำหรับดึงข้อมูลจากตาราง borrow_record
app.get('/api/borrow_records', (req, res) => {
    db.query('SELECT * FROM borrow_record', (err, results) => {
        if (err) {
            res.status(500).send({ error: 'Database error' });
            return;
        }
        res.json(results);  // ส่งข้อมูลเป็น JSON
    });
});

// เริ่มต้นเซิร์ฟเวอร์
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
