const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const signin = require('./controllers/signin.js');
const register = require('./controllers/register.js');
const image = require('./controllers/image.js');

const db = knex({

  client: 'pg',
  connection: {
   	connectionString: process.env.DATABASE_URL,
	 ssl: true
 
  }
});

const app = express();

app.use(cors())
app.use(bodyParser.json());

app.get('/', (req, res)=> {res.send('success');})

app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)})

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)})

app.put('/image', (req, res) => {image.handleImage(req, res, db)})
app.post('/imageUrl', (req, res) => {image.handleApiCall(req, res)})

app.listen(process.env.PORT ||  3000, ()=> {
  console.log(`app is running on port ${process.env.PORT}`);
})
