
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
var cors = require('cors');
const knex = require('knex');////
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
        connectionString: rocess.env.DATABASE_URL,
        rejectUnauthorized: false
    }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => { res.send(db.users) });
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt); });
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt); });
app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db); });
app.put('/image', (req, res) => { image.handleImage(req, res, db); });
app.post('/imageUrl', (req, res) => { image.handleAPICall(req, res); });

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port 3000 ${process.env.PORT}`);
});

/**
 * --> res = this is working
 * signin --> POST = success/fail
 * register --> POST = user
 * profile/:userId --> GET = user
 * image --> PUT --> user
*/
