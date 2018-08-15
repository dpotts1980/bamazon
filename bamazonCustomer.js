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
 var arr = [];
function showMerchandise() {
    connection.query("SELECT * FROM products", function(err, res) {
    for (let r of res){
      arr.push(r.id.toString());
    }
    console.table(res)
    purchase();
    });//end of query

  }//end of showMerchandise
  showMerchandise();
 // purchase();
  
  //function which prompts user which item they want by id, and what quantity
  function purchase() {
    console.log("arr", arr)
    inquirer
      .prompt({
        name: "itemID",
        type: "input",
        message: "What is the item ID you would like to purchase? ",
        choices: arr
      }).then(function(ans){
        console.log(ans)
        checkItemamount(res.itemID)
        //call to another function that 
      })
  }//end of function purchase
  