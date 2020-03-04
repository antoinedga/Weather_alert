var zipfunc = require('zipcodes');
var dark = require('./darkSki.js');


module.exports = function getGeoCoordination(zipCode) 
{
    var geo = {
        lat: "",
        long: ""
    }

    var temp = zipfunc.lookup(zipCode);

    geo.lat = temp.latitude;
    geo.long = temp.longitude;
    return geo;
};
