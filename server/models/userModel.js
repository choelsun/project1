import mariadb from "mariadb";
import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";

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
const getOneUser = async (userId) => {
    let conn; // 연결설정 변수(연결 POOL)
    try{
        conn = await pool.getConnection();
        const rows = await conn.query("SELECT * FROM users WHERE id=?"
            , [userId]);
        return rows;
    } catch(err) {
        console.log(err);
    } finally {
        if(conn) conn.end();
    }
}
const addUser = async (id, pwd, name, nick, email, hint) => {
    let conn; // 연결설정 변수(연결 POOL)
    const saltRounds = 10;
    const hashedPwd = await bcrypt.hash(pwd, saltRounds);
    try{
        conn = await pool.getConnection();
        const rows = await conn.query("INSERT INTO users (id, pwd, name, nickname, email, pwd_hint)  VALUES (?, ?, ?, ?, ?, ?)"
            , [id, hashedPwd, name, nick, email, hint]);

        return rows;
    } catch(err) {
        console.log(err);
    } finally {
        if(conn) conn.end(); // VS release
         // end(): 연결(pool) 자체 종료 -> 재접시 시간, 네트워크 비용 증가
    }
}
// 객체 (Object): 문자열, 숫자, 논리, 함수, 클래스, 심볼
// 거의 모든 자바 스크랩트 자료형을 담을 수 있다.
const userModel = {
    getAllUsers,
    getOneUser,
    addUser
}

export default userModel;