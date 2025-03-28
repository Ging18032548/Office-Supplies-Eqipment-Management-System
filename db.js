const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'mysql_db', // ถ้าใน docker-compose.yml ใช้ชื่อบริการว่า mysql_db
    user: 'root',
    password: 'yourpassword',
    database: 'yourdatabase'
});

connection.connect((err) => {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});

module.exports = connection;
