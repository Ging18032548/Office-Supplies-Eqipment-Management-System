// const mysql = require("mysql2");

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


// ใช้ require เพื่อเชื่อมต่อกับ db.js
const db = require('./server/db');

// การเชื่อมต่อกับฐานข้อมูลสามารถใช้จากที่นี่
// ตัวอย่างการ query ข้อมูลจากฐานข้อมูล
db.query('SELECT * FROM equipment', (err, rows) => {
    if (err) {
        console.error('Error fetching data: ', err);
    } else {
        console.log('Equipment data: ', rows);
    }
});

const axios = require('axios');

// URL ของ API ที่รันในเซิร์ฟเวอร์
const apiUrl = 'http://localhost:8880/equipment';

// การดึงข้อมูลจาก API
axios.get(apiUrl)
  .then(response => {
    console.log('Equipment data:', response.data);  // ข้อมูลจาก API
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

// ตัวอย่างการเพิ่มข้อมูลใหม่ไปยังฐานข้อมูลผ่าน API
const newEquipment = {
  name: 'New Equipment',
  category: 'Category A',
  status: 'Available'
};

axios.post(apiUrl, newEquipment)
  .then(response => {
    console.log('Added new equipment:', response.data);
  })
  .catch(error => {
    console.error('Error adding equipment:', error);
  });
