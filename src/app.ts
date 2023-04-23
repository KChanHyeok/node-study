import express, { Request, Response, NextFunction } from "express";

const app = express();
const mysql = require("mysql");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "testdb",
});

con.connect(function (err: any) {
  if (err) throw err;
  console.log("Connected");
  const sql =
    "CREATE TABLE IF NOT EXISTS member (" +
    "member_id varchar(255) not null primary key ," +
    "member_pwd int not null," +
    "member_name varchar(255) not null);";
  con.query(sql, function (err: any, result: any) {
    if (err) throw err;
  });
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("어서오세요 반갑습니다");
});

app.post("/join", (req: Request, res: Response, next: NextFunction) => {
  const sql = `INSERT INTO member(member_id, member_pwd, member_name) VALUES('${req.body.member_id}', '${req.body.member_pwd}', '${req.body.member_name}')`;
  con.query(sql, function (err: any, result: any) {
    if (err) throw err;
    res.send("회원가입이 완료 되었습니다.");
  });
});

app.get("/login", (req: Request, res: Response, next: NextFunction) => {
  const sql = `SELECT member_pwd FROM member WHERE member_id='${req.body.member_id}'`;
  con.query(sql, function (err: any, result: any) {
    if (err) throw err;
    if (result[0].member_pwd === req.body.member_pwd) {
      res.send({
        message: "로그인이 완료 되었습니다",
        state: "ok",
      });
    }
  });
});

app.listen("8080", () => {
  console.log(`
  ################################################
  🛡️  Server listening on port: 1234🛡️
  ################################################
    `);
});
