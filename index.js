const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: 'localhost', // หรือ IP ของ container MySQL
    user: 'root', // ชื่อผู้ใช้ฐานข้อมูล
    password: 'password', // รหัสผ่านฐานข้อมูล
    database: 'webmanagement' // ชื่อฐานข้อมูล
});

connection.connect((err) => {
    if (err) {
        console.error("Error connecting to the database: ", err);
        return;
    }
    console.log("Connected to the database!");
});

module.exports = connection;
