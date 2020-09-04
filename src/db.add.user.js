const Promise = require("bluebird");
const mysql = require("mysql");

Promise.promisifyAll(require("mysql/lib/Connection").prototype);
Promise.promisifyAll(require("mysql/lib/Pool").prototype);

const DB_CONFIG = {
  host: "127.0.0.1",
  user: "root",
  password: "mlab1234",
  database: "user",
};

let addUser = async (input) => {
  const connection = mysql.createConnection(DB_CONFIG);
  await connection.connectAsync();

  let sql =
    "INSERT INTO info (username, password, email, mobile) VALUES (?, ?, ?, ?)";
  await connection.queryAsync(sql, [
    input.username,
    input.password,
    input.email,
    input.mobile,
  ]);

  await connection.endAsync();
};

let authenticateUser = async (input) => {
  const connection = mysql.createConnection(DB_CONFIG);
  await connection.connectAsync();

  let sql = "SELECT * FROM info WHERE email=? AND PASSWORD=?";
  const results = await connection.queryAsync(sql, [
    input.username,
    input.password,
  ]);

  await connection.endAsync();

  if (results.length === 0) {
    throw new Error("Invalid Credentials");
  }
};

//FOrGOT PASSWORD

let forgotpassword = async (input) => {
  const connection = mysql.createConnection(DB_CONFIG);
  await connection.connectAsync();

  let sql = "SELECT * FROM info WHERE email=?";
  const results = await connection.queryAsync(sql, [
    input.username,
  ]);

  await connection.endAsync();

  if (results.length === 0) {
    throw new Error("Invalid Credentials");
  }
};

//RESET USER
let reset = async (input) => {
  const connection = mysql.createConnection(DB_CONFIG);
  await connection.connectAsync();

  let sql = "SELECT * FROM info WHERE email=?";
  const results = await connection.queryAsync(sql, [
    input.username,
  ]);

  let sql2="update info set password=? where email=?";
  const results2= await connection.queryAsync(sql2,[
    input.password,
    input.username,
  ])

  await connection.endAsync();

  if (results.length === 0) {
    throw new Error("Invalid Credentials");
  }
};
//add to cart
let cart = async (input) => {
  const connection = mysql.createConnection(DB_CONFIG);
  await connection.connectAsync();

  let sql = "SELECT * FROM info WHERE email=?";
  const results = await connection.queryAsync(sql, [
    input.username,
  ]);

  await connection.endAsync();

  if (results.length === 0) {
    throw new Error("Invalid Credentials");
  }
};


module.exports = { addUser, authenticateUser,forgotpassword,reset };