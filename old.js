const mysql = require('mysql2');
const express = require('express');
const bodyParser = require('body-parser');

// Connect to a mysql database
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'master',
    password: 'masterpassword',
    database: 'mydb'
});
connection.connect();

// Initialize our web app
const app = express();
app.use(bodyParser.json());

// Handle request to the base IP/URL
app.get('/', (req, res) => {
    res.json({ 'Hello': 'World!' });
});

// hw2: requirement1
app.get('/greeting', (req, res) => {
    res.send("Hello World!");
});

// Handle insert operations to our database
app.post('/addName', (req, res) => {
    let n = req.body.name;
    n = n.replace(/^[0-9\s]*|[+*\r\n]/g, '');
    query = `INSERT INTO nametable (name) VALUES ('` + n + `');`;
    connection.query(query, (e, r, f) => {
        console.log(r);
        res.json({ 'message': 'Add successful.', 'users': r });
    });
});

// hw2: requirement2
app.post('/register', (req, res) => {
    let n = req.body.username;
    n = n.replace(/^[0-9\s]*|[+*\r\n]/g, '');
    query = `INSERT INTO Users (username) VALUES ('` + n + `');`;
    connection.query(query, (e, r, f) => {
        console.log(r);
        res.json({ 'message': 'Add successful.', 'users': r });
    });
});

// hw2: requirement2
app.get('/list', function (req, res) {
    let sql = `SELECT * FROM Users`;
    connection.query(sql, function (e, r, f) {
        if (e) throw err;
        var data = {
            users: []
        }
        for (var i = 0; i < r.length; i++) {
            data.users.push(r[i].username);
        }
        res.send(data);
    });
})

// hw2: requirement2
app.post('/clear', (req, res) => {
    // let n = req.body.username;
    // n = n.replace(/^[0-9\s]*|[+*\r\n]/g, '');
    query = `DELETE FROM Users;`;
    connection.query(query, (e, r, f) => {
        console.log(r);
        res.json({ 'message': 'Clear successful.', 'users': r });
    });
});

var http = require('http').Server(app);

const PORT = 80;
http.listen(PORT, function () {
    console.log('Listening');
});