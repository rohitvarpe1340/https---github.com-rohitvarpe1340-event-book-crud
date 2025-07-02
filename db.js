const mysql = require('mysql2');
const db = mysql.createConnection({
   host:'localhost',
   user:'root',
   password:'rohit',
   database:'event'
});

db.connect(err =>{
    if(err)throw err;
    console.info('mysql is connected');
});

module.exports = db;