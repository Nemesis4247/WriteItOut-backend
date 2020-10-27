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
const getLikedQuestions = require('./controllers/Read/getLikedQuestions');
const getLikedAnswers = require('./controllers/Read/getLikedAnswers');

// Create
const register = require('./controllers/Create/register');
const add_question = require('./controllers/Create/add_question');
const insertcomment = require('./controllers/Create/insertcomment')
const answer = require('./controllers/Create/answer');

// Update
const update_details = require('./controllers/Update/update_details');
const like_unlike_question = require('./controllers/Update/like_unlike_question');
const like_unlike_answer = require('./controllers/Update/like_unlike_answer');


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

//Create
app.post('/comment', insertcomment.handleInsertComment(db));

app.post('/answer', answer.handleAnswer(db));

app.post('/register', register.handleRegister(db, bcrypt))

app.post('/add_question', add_question.handleAddQuestion(db))

// Read
app.get('/profile/:id', getProfile.handlegetProfile(db));

app.post('/signin', signin.handleSignin(db, bcrypt))

app.get('/get-questionList', getQuestionsList.handleQuesList(db))

app.get('/get-question/:id', getQuestion.handleQuestion(db))

app.post('/getLikedQuestions/', getLikedQuestions.handleLikedQuestions(db))

app.post('/getLikedAnswers/', getLikedAnswers.handleLikedAnswers(db))

//update
app.post('/update_details', update_details.handleUpdateDetails(db))

app.post('/likeUnlikeQuestion', like_unlike_question.handleLikeUnlikeQuestion(db))

app.post('/likeUnlikeAnswer', like_unlike_answer.handleLikeUnlikeAnswer(db))

////////////////////

app.listen(3001);
