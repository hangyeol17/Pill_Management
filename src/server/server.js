const express = require('express');
const app = express();
const port = 4903;
const mysql2 = require('mysql2/promise');
const dbconfig = require('./config/database.js');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


class Server {
  static async main(inputs) {
    try {
      const pool = await mysql2.createPool(dbconfig);
      const connection = await pool.getConnection();
      const { dayy, timee, pulse, blood_sugar, blood_pressure, temperature } = inputs;
      const sql = `INSERT INTO health(dayy, timee, pulse, blood_sugar, blood_pressure, temperature) VALUES ('${dayy}', '${timee}','${pulse}', '${blood_sugar}', '${blood_pressure}', '${temperature}')`;

      await connection.query(sql);

      console.log("데이터 추가 완료");

      connection.release();
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}


app.set('port', process.env.PORT || 4903);

app.get('/', (req, res) => {
  res.send('<h1 style="text-align: center;">메인 페이지입니다.</h1>');
});

app.post('/in', async (req, res) => {
  try {
    const inputs = req.body;
    await Server.main(inputs);
    res.send('<h1 style="text-align: center;">입력이 완료되었습니다.</h1>');
  } catch (err) {
    console.error(err);
    res.send('<h1 style="text-align: center;">입력 중 오류가 발생했습니다.</h1>');
  }
});

app.get('/db', async (req, res) => {
  try {
    const pool = await mysql2.createPool(dbconfig);
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM health');

    console.log('User info is: ', rows);

    connection.release();
    res.send(rows);
  } catch (err) {
    console.error(err);
    res.send('<h1 style="text-align: center;">데이터베이스 조회 중 오류가 발생했습니다.</h1>');
  }
});

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
