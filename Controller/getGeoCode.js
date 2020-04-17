var zipfunc = require('zipcodes');
const usZips = require('us-zips')


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

    console.log(temp);

    geo.lat = temp.latitude;
    geo.long = temp.longitude;
    geo.city = temp.city;
    return geo;
};
