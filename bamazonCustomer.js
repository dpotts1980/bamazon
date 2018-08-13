var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require("console.table")

var connection = mysql.createConnection({
    host: "localhost",
  // Your port; if not 3306
    port: 3306,
  // Your username
    user: "root",
  // Your password
    password: "password",
    database: "bamazonDB"
  });
  
  connection.connect(function(err) {
    if (err) throw err;
    });
 
     function showMerchandise() {
      connection.query("SELECT * FROM products", function(err, res) {
      console.table(res)
      });//end of query

  }//end of showMerchandise
  showMerchandise();
 