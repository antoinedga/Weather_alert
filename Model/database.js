var mysql = require('mysql');
var isEmpty = require('is-empty');
var location = require('../Controller/getGeoCode');
var connection = null;

module.exports.start_connection = function start_connection() {

  connection = mysql.createConnection({
      host: "weather-db-email.mysql.database.azure.com", 
      user: "antoinedga@weather-db-email",
      database : 'weather_email',
      password: "Adga7241805!", 
      port: 3306, 
      ssl:true
  });


  connection.connect(function(err) {
      if (err) {
        console.error('error connecting: ' + err.stack);
        return;
      }
    
      console.log('connected to database as id ' + connection.threadId);
    });

}

// mysql version to find user thats logging in
// had to make it a promise to work get results before doing anything with it
// default value is an empty string for safety with query
module.exports.userFindOne = function(email = "") {
    return new Promise(function(resolve, reject) {
        
    connection.query(`select _id, email, username, password from user_info where email = \'${email}\';`, (err, usr, fields) => {
        if (err)
          return reject(err);
        // no error, just not in the database so resolve and return null
        if(isEmpty(usr))
          resolve(null);
        // hackie, converts into a JSON format to later be a Javascript Object
        resolve(JSON.parse(JSON.stringify(usr))[0]);
    });
  });
}


module.exports.createNewUser = function(user) {
  
  return new Promise(async function(resolve, reject) {

    connection.beginTransaction(function(err) {
      if (err) { throw err; }
      var id;
      // insert user account to table user_info
      connection.query(`INSERT INTO user_info (username, email, password) values (\'${user.name}\', \'${user.email}\', \'${user.password}\')`, 
      function (error, results, fields) {
        if (error) {
          return connection.rollback(function() {
            return reject(err);
          });
        }
        
        id = results.insertId
        
        const geo = location.getGeoCoordination(user.zipcode);
          // query to insert zipCode In lattitude and longitude
        const temp = `INSERT INTO location values (${id}, ${geo.lat}, ${geo.long})`;
        console.log(temp);
          
        connection.query(temp, function (error, results, fields) {
          if (error) {
            return connection.rollback(function() {
              return reject(err);
            });
          }


          connection.commit(function(err) {
            if (err) {
              return connection.rollback(function() {
                return reject(err);
              });
            }
            console.log('success!');
            return resolve();
          });

        });

      });

    });
  });
}

  module.exports.userByID = function(id = 0) {

      return new Promise(function(resolve, reject) {
          
      connection.query(`select _id from user_info where _id = ${id};`, (err, usr, fields) => {
          if (err)
            return reject(err);
          // no error, just not in the database so resolve and return null
          if(isEmpty(usr))
            resolve(false);
          const id_temp = JSON.parse(JSON.stringify(usr))[0]._id
          resolve({status: true, id: id_temp});
      });
    });
  }

