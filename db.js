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


const mysql = require('mysql2');

// ตั้งค่าการเชื่อมต่อ MySQL
const db = mysql.createPool({
    host: "localhost",
    user: "root",   // แก้เป็น user ของคุณ
    password: "",   // แก้เป็น password ของคุณ
    database: "your_database", // เปลี่ยนเป็นชื่อฐานข้อมูล
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = db;
