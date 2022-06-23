var express = require('express');
var PORT = 5000;
var cors = require('cors')
var morgan = require('morgan');
var app = express();
app.use(cors())
app.use(morgan('dev'));
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'ecommerce',
    password: '',
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});
app.get('/users', function (req, res) {
    console.log('im in get',)
    connection.query('SELECT * FROM users', function (error, results, fields) {
        return res.send(results);
    });
});
app.post('/user', function (req, res) {
    // let user = req.body;

    console.log('req.body', req.body);
    // return res.json({data:'hello world',body:req.body});
    connection.query("INSERT INTO users values(?,?,?,?,?,?) ", [null, req.body.username, req.body.phoneNumber, req.body.email, req.body.password, req.body.address], function (error, results, fields) {
        if (error) throw error;
        return res.send({ data: results, status_code: "200", message: "Data inserted successfully" });
    });
});
app.put("/updatepass", (req, res) => {
    console.log("req.body", req.body);
    var query = `update  users set  Password='123456' where id =25`;
    connection.query(query, (error, results, fields) => {
        if (error) throw error;

        res.json({
            data: results,
        });
    });
});

app.delete('/delete',function(req,res){

    let Id   = req.body.id;
  
      connection.query("DELETE FROM users WHERE id=?",[Id],(err, rows, fields)=>{
        console.log('rows', rows)
        
        if(rows.affectedRows==0){ return res.json('Unsuccessfull')}
        else res.json('Successfully Deleted!');
      });
  });
  app.get('/products',(req, res)=>{
    connection.query('SELECT * FROM products',(err, rows, fields)=>{
      if(!err)
      res.send(rows);
      else
      console.log(err);
    })
  });



const IP = '192.168.18.112'
app.listen(PORT, function () {
    console.log('Node app is running on port 5000');
});
module.exports = app;