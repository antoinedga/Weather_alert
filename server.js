const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();
const axios = require('axios');
const path = require('path');
require('dotenv').config;
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
app.use(bodyParser.json());
// DB Config

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})


app.listen(port, () => console.log(`Server up and running on port ${port} !`));