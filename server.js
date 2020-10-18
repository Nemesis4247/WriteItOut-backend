const express = require('express');
const bodyParser = require('body-parser');
const cors= require('cors');
var knex = require('knex');
const moment = require('moment');
const app =express();
app.use(bodyParser.urlencoded({extented:true}));
app.use(bodyParser.json());
app.use(cors());

const db=knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'super',
    database : 'writeitoutdb'
  }
});


console.log("it's working");
app.post('/',(req,res) =>{
  console.log(req.body);
  res.send("success");
});

// signin endpoint
app.post('/signin',(req,res) =>{
  console.log(req.body);
  const {email, password} = req.body;
  db('Users').where('email', '=', email).then((data) => {
    if (data.length==0) {
      res.send("email not exist");
    }
    else {
      if(data[0].password!=password){
        res.send("password is not correct");
      }
      else{
        res.send("signed in successfully");
      }
    }
  });
});


//registeruser endpoint
app.post('/registeruser',(req,res) =>{
  console.log(req.body);
  const { userid, name, email, password, year, branch, description, profilepic }=req.body;

 db('Users').insert({ userid:userid,
                      name: name,
                      email: email,
                      password: password,
                      year: year,
                      branch: branch,
                      description: description,
                      profilepic: profilepic
                      }).then();

res.send("registered successfully");
});

app.listen(3001);
