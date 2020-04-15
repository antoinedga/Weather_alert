var zipfunc = require('zipcodes');


module.exports.getGeoCoordination = function getGeoCoordination(zipCode) 
{
    var geo = {
        lat: "",
        long: ""
    }

    var temp = zipfunc.lookup(zipCode);
    console.log(temp + " from the look up\n\n");
    if (temp == undefined)
        return null

    geo.lat = temp.latitude;
    geo.long = temp.longitude;
    geo.city = temp.city;
    return geo;
};
