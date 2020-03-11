var zipfunc = require('zipcodes');


module.exports.getGeoCoordination = function getGeoCoordination(zipCode) 
{
    var geo = {
        lat: "",
        long: ""
    }

    var temp = zipfunc.lookup(zipCode);

    if (temp == undefined)
        return null

    geo.lat = temp.latitude;
    geo.long = temp.longitude;
    return geo;
};
