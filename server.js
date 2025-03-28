// server.js (Node.js + Express)
const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 8080;

// ตั้งค่าเชื่อมต่อกับฐานข้อมูล MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'webdb'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL Database');
});

// API Endpoint เพื่อดึงข้อมูลจากตาราง 'equipment'
app.get('/api/equipment', (req, res) => {
  db.query('SELECT * FROM equipment', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// เริ่มเซิร์ฟเวอร์
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
