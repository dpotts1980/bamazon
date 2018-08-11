var mysql = require("mysql");

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
    console.log("connected as id " + connection.threadId);
    //connection.end();
    showMerchandise();
  });
 

  function showMerchandise() {
    connection.query("SELECT * FROM products", function(err, res) {
        if(err) throw err
         for (let i = 0; i < res.length; i++) {
            console.log(" - - - - - - - - - - - - - - - ")
            console.log("item number: " + res[i].item_id)
            console.log("item: " + res[i].product_name)
            console.log("price: $" + res[i].price)
        }//end of for loop
    });//end of query

  }//end of showMerchandise
  showMerchandise();
 /*  function readProducts() {
    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.log(res);
      connection.end();
    });
  }
  readProducts(); */
  
  // function which prompts the user for what action they should take
/* function start() {

} *///end of function start