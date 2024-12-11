const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '813323',
    database: 'mind_connect'
});

module.exports = connection;


