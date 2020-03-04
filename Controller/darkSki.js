const axios = require('axios');
require('dotenv').config();


exports.getMinuteForecast = function getMinuteForecast(geo) 
{
    var string = `https://api.darksky.net/forecast/${process.env.DARKSKY_KEY}/${geo.lat},${geo.long}?exclude=currently,flags,hourly`;
    axios.get(string)
    .then(
        (data) => {

        });
}

