// const express = require("express");
// const cors = require("cors");
// const pool = require("./db");

// const db = require('../db'); // ใช้ '..' เพื่อขึ้นไปยังโฟลเดอร์หลักและโหลด db.js

// const app = express();
// app.use(cors());
// app.use(express.json());

// // ดึงข้อมูลอุปกรณ์ทั้งหมด
// app.get("/supplies", async (req, res) => {
//     try {
//         const [rows] = await pool.query("SELECT * FROM supplies");
//         res.json(rows);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// // เพิ่มอุปกรณ์ใหม่
// app.post("/supplies", async (req, res) => {
//     try {
//         const { name, category_id, quantity, location, status } = req.body;
//         const sql = "INSERT INTO supplies (name, category_id, quantity, location, status) VALUES (?, ?, ?, ?, ?)";
//         await pool.query(sql, [name, category_id, quantity, location, status]);
//         res.json({ message: "Added successfully" });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// // ตั้งค่าพอร์ต
// const PORT = 8840;
// app.listen(PORT, () => {
//     console.log(`✅ Server running on port ${PORT}`);
// });



const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

// API ดึงข้อมูล users
app.get("/users", async (req, res) => {
    try {
        const [rows] = await db.query("SELECT id, firstname, lastname FROM users");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// API ลบ user
app.delete("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await db.query("DELETE FROM users WHERE id = ?", [id]);
        res.json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// เปิดเซิร์ฟเวอร์
app.listen(8880, () => {
    console.log("Server is running on http://localhost:8880");
});
