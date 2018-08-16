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
      .prompt([
        {
        name: "id",
        type: "input",
        message: "What is the item ID you would like to purchase? ",
        
        },
        {
        name: "stock_quantity",
        type: "input",
        message: "How many would you like to purchase? ",
        
      }
      ])
        
      .then(function(ans){
        var item = ans.id;
        var quantity = ans.stock_quantity;
        console.log(ans.id);
        console.log(ans.stock_quantity);
         connection.query("SELECT * FROM products", function(err,res) {
          if (err) throw err;
          if (res.length === 0) {
            console.log("ERROR: Invalid Item. Please select a valid ID.")
            showMerchandise();
           } else {
            var itemInfo = res[0];
            if (quantity <= itemInfo.stock_quantity) {
              console.log(itemInfo.product_name + "is available! Let me place your order now! ")
            }
          }
             
          })//end of connection.query
        //end of then(function(ans))

        
        
        
      })//end of .then function
  }//end of function purchase
  
 