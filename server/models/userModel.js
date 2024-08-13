import mariadb from "mariadb";
import dotenv from "dotenv";
dotenv.config();

// db connection
const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    connectionLimit: 5
  });

  // arrow funtion 화살표 함수
const getAllUsers = async () => {
    let conn; // 연결설정 변수(연결 POOL)
    try{
        conn = await pool.getConnection();
        const rows = await conn.query("SELECT * FROM users");
        return rows;
    } catch(err) {
        console.log(err);
    } finally {
        if(conn) conn.end();
    }
}
// 객체 (Object): 문자열, 숫자, 논리, 함수, 클래스, 심볼
// 거의 모든 자바 스크랩트 자료형을 담을 수 있다.
const userModel = {
    getAllUsers
}

export default userModel;