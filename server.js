const express = require("express");
const bodyParser = require("body-parser");
const cookies = require('cookie-parser');
const cors = require('cors');
const app = express();
const path = require('path');
const passport = require('passport');
const user = require('./Controller/user');
require('dotenv').config();
const db = require('./Model/database.js');

const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, 'build')));

db.start_connection();
app.use(cors());
 
// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

require('./Controller/passport');

app.use(cookies());
app.use(bodyParser.json());
app.use(passport.initialize());
// DB Config
app.use('/user', user);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(port, () => console.log(`Server up and running on port ${port} !`));