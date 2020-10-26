const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs')
var knex = require('knex');
const moment = require('moment');
const app = express();

// Read
const signin = require('./controllers/Read/signin');
const getQuestionsList = require('./controllers/Read/getQuestionsList');
const getQuestion = require('./controllers/Read/getQuestion');
const getProfile = require('./controllers/Read/getProfile');

// Create
const register = require('./controllers/Create/register');
const add_question = require('./controllers/Create/add_question');
const insertcomment = require('./controllers/Create/insertcomment')
const answer = require('./controllers/Create/answer');

// Update
const update_details = require('./controllers/Update/update_details');


app.use(bodyParser.urlencoded({ extented: true }));
app.use(bodyParser.json());
app.use(cors());

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: 'newPassword',
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

//Create
app.post('/comment', insertcomment.handleInsertComment(db));

app.post('/answer', answer.handleAnswer(db));

// Read
app.get('/profile/:id', getProfile.handlegetProfile(db));

app.listen(3001);
