import { fileURLToPath } from "url";
const __dirname = fileURLToPath(new URL(".", import.meta.url));
const __filename = fileURLToPath(import.meta.url);

import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import userRouter from "./routes/userRoutes.js"

// import { log } from "console";
dotenv.config();


const app = express();
const port = process.env.PORT || 4000;
// const mode = process.env.MODE;

app.use(express.json()); // json 포맷으로 인식
app.use(cors()); // CORS policy

// route : .get(): 받기, .post(): 보내기, .put(): 부분 수정 .delete(): 삭제
// RESTful API : REpresentatinal (대표성 있는 방식으로 요청 URL을 생성하는 규칙)

app.use("/", userRouter);
 // es6 : import(가져오기), (export)내보내기
 // commonJS : require(가져오기), module.exports 또는 exports(내보내기)
//  const port = 3000;
 const setting = {
  app,
  port
 }
 export default setting;