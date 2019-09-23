function data(sql,callback,params=null) {
  const mysql = require('mysql');
  const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '123456',
    database: 'epress_mysql_api',
  });

  connection.connect();
  //增删改查
  if (params != null) {
    connection.query(sql, params, callback);
  } else {
    connection.query(sql, callback);
  }
  connection.end();
}

module.exports = data