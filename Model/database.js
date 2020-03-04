var mysql = require('mysql');
var isEmpty = require('is-empty');
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

  module.exports.databaseController = connection;
}


module.exports.userFindOne = function(email = "")
{
    return new Promise(function(resolve, reject) {
        
    connection.query(`select email, password from user_account where email = \'${email}\';`, (err, usr, fields) => {
       
        
        if (err)
          return reject(err);
        
        resolve(JSON.parse(JSON.stringify(usr))[0]);
    });
  });
}



