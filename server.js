const express = require("express");
const bodyParser = require("body-parser");
var cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const user = require('./Controller/Routes/user');
const weather = require('./Controller/Routes/weather');
const hour_controller = require("./Controller/Routes/hours");
const EmailRoutine = require("./email_routin");
const path = require('path');
const passport = require('passport');

require('dotenv').config();

app.use(express.static(path.join(__dirname, 'build')));
app.use(cors());
 
// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(passport.initialize());

// Passport config
require("./Controller/passport")(passport);

const port = process.env.PORT || 8080;
// DB Config

app.use('/user', user);
app.use('/api/hours', hour_controller);
app.use('/api/weather', weather)

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
});

mongoose.connect(
    process.env.MONGO_URL,
    { useNewUrlParser: true,
      useUnifiedTopology: true  }
  )
  .then(() => { 
    console.log("MongoDB successfully connected");

    console.log('Initializing Email Routine');
    EmailRoutine();

  })
  .catch(err => console.log(err));


app.listen(port, () => console.log(`Server up and running on port ${port} !`));