const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const server = express()
server.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  passersword: "",
  database: "flutter_db"

})
db.connect(function (error) {
  if (error) {
    console.log("Error connection to db")
  }
  else {
    console.log("successfully connected to db")
  }
});



server.post('/insert', (req, res) => {
  let data = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    };


  console.log(req.body.first_name, req.body.last_name)
  global.is_taken = true;
   sql = "SELECT * FROM student WHERE email=?" ;
  query=db.query(sql,data.email,(err, results) => {
    if (query._results =='') {
      //res.send({ status: true, message: 'a' });
      
      

    
        let sql = "INSERT INTO student SET ?"
        db.query(sql,data, (err, results) =>{
          if (err) {
            console.log("cant insert data");
    
          }
          else {
            res.send( {'message':'sign_up suceessfully'} )
            console.log("insert data successfully")
    
          
    
          
        }});
    
        }
      


   
    else {
      res.send({'message':"change the email"} );
      console.log("change the email");
      global.is_taken = true;
      console.log(query._results)}
  });
  
  
 
  })

 
  


server.listen(8080, function check(err) {
  if (err) console.log("Error");
  else console.log("started.....||");
});
