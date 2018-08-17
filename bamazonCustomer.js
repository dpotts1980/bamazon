var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require("console.table");

var amountDue;
var department;


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
 //this is the function that shows available merchandise//
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
        message: "What is the item ID you would like to purchase? ",
        validate: function(value){
          var valid = value.match(/^[0-9]+$/)
          if(valid){
            return true
          }
            return 'Please enter a valid Product ID'
        }
        
        },
        {
        name: "stock_quantity",
        message: "How many would you like to purchase? ",
        validate: function(value){
          var valid = value.match(/^[0-9]+$/)
          if(valid){
            return true
          }
            return 'Please enter a numerical value'
        }
      }
      ])
        
      .then(function(ans){
      
         connection.query("SELECT * FROM products WHERE id = ?", [ans.id], function(err,res) {
          if(ans.stock_quantity > res[0].stock_quantity) {
            console.log('Insufficient Quantity');
		      	console.log('This order has been cancelled');
			      console.log('');
			      newPurchase();
    }//end of if statement
          else{
            amountDue = res[0].price * ans.stock_quantity;
            department = res[0].department_name;
            console.log('Thanks for your order');
			      console.log('You owe $' + amountDue);
            console.log('');
            //here is where we'll update our inventory
            connection.query('UPDATE products SET ? Where ?', [{
              stock_quantity: res[0].stock_quantity - ans.stock_quantity
            },{
              id: ans.id
            }], function(err, res){});
            //update departments table
            
            newPurchase();
         
          }//end of else 
          });//end of "SELECT * FROM products WHERE id = ?
        });//end of .then

        //allows the customer to make another purchase//
        function newPurchase(){
          inquirer.prompt([{
            type: 'confirm',
            name: 'choice',
            message: 'Is there anything else you would like to purchase today?'
          }]).then(function(answer){
            if(answer.choice){
              purchase();
            }
            else{
              console.log('Thank you for shopping with us!');
              connection.end();
            }
          })//end of .then
        };//end of function newPurchase
        
        
  }//end of function purchase
  
 