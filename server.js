const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs')
var knex = require('knex');
const moment = require('moment');
const app = express();

const register = require('./controllers/Create/register');
const signin = require('./controllers/Read/signin');
const update_details = require('./controllers/Update/update_details');
const add_question = require('./controllers/Create/add_question');
const getQuestionsList = require('./controllers/Read/getQuestionsList');
const getQuestion = require('./controllers/Read/getQuestion');


app.use(bodyParser.urlencoded({ extented: true }));
app.use(bodyParser.json());
app.use(cors());

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: 'newpassword',
    database: 'writeitoutdb'
  }
});

console.log("it's working");
app.get('/', (req, res) => {
  console.log(req.body);
  res.send("success");
});

app.post('/register', register.handleRegister(db, bcrypt))

app.post('/signin', signin.handleSignin(db, bcrypt))

app.post('/update_details', update_details.handleUpdateDetails(db))

app.post('/add_question', add_question.handleAddQuestion(db))

app.get('/get-questionList', getQuestionsList.handleQuesList(db))

app.get('/get-question/:id', getQuestion.handleQuestion(db))

app.listen(3001);
