import { fileURLToPath } from "url";
const __dirname = fileURLToPath(new URL(".", import.meta.url));
const __filename = fileURLToPath(import.meta.url);

import express from "express";
import mariadb from "mariadb";
import cors from "cors";
import dotenv from "dotenv";
import { log } from "console";
dotenv.config();


const app = express()

app.use(express.json()); // json 포맷으로 인식
app.use(cors()); // CORS policy

// route : .get(): 받기, .post(): 보내기, .put(): 부분 수정 .delete(): 삭제
// RESTful API : REpresentatinal (대표성 있는 방식으로 요청 URL을 생성하는 규칙)
app.get('/', function (req, res) {
  // console.log(__dirname);
  res.sendFile(__dirname+"public/index.html")
  // res.send('<h1>Hello World</h1>')
})
// db connection
const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  connectionLimit: 5
});
app.get('/getAllUsers', function (req, res) {
  // MariaDB 연결 드라이버를 통해 서버의 DBMS 데이터로 접근 할 수 있어야 함
  pool.getConnection()
  .then(conn => {
    console.log("============== MairaDB is connectde! ===============")
    conn.query("SELECT * FROM users")
      .then((rows) => {
         res.status(200).json(rows);    // res 응답 객체에서 제공하는 .json() 메소드로 데이터를 전송
         return conn.end(); // 또 다른 요청에 응답하기 위해 한 번 요청 처리하면 접속 끊기
      })
      .catch(err => {
        //handle error
        console.log(err); 
        conn.end();
      })
      
  }).catch(err => {
    console.log(err); // DB연결 시 에러가 발생되면 에러 출력
    //not connected
  });
})
 // es6 : import(가져오기), (export)내보내기
 // commonJS : require(가져오기), module.exports 또는 exports(내보내기)
 const port = 3000;
 const setting = {
  app,
  port
 }
 export default setting;