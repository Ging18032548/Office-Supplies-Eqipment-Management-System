const express = require('express');
const app = express();
const db = require('./db');

app.get('/equipment', async (req, res) => {
    const [rows] = await db.query('SELECT * FROM equipment');
    res.json(rows);
});

app.get('/maintenance', async (req, res) => {
    const [rows] = await db.query('SELECT * FROM maintenance');
    res.json(rows);
});

app.get('/borrow_records', async (req, res) => {
    const [rows] = await db.query('SELECT * FROM borrow_records');
    res.json(rows);
});

app.get('/users', async (req, res) => {
    const [rows] = await db.query('SELECT * FROM users');
    res.json(rows);
});


app.listen(8880, () => {
    console.log('Server is running on http://localhost:8880');
});
