const express = require('express');
const mysql = require('mysql');
const dbconfig = require('./config/database.js');
const connection = mysql.createConnection(dbconfig);

const app = express();

/*
// 데이터 삽입 되냐? 이게 되네 ㅋㅋ
connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "INSERT INTO user()VALUES('tmdgur','gustnr','wjdgh','2001-03-04','woman','165','77')";
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1개 추가요~");
  });
});
*/

// configuration =========================
app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
  res.send(`메인 페이지... 입니다.${req}`);
});

app.get('/db', (req, res) => {
  connection.query('SELECT * from user', (error, rows) => {
    if (error) throw error;
    console.log('User info is: ', rows);
    res.send(rows);
  });
});

app.listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'));
});
