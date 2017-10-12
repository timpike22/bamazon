
var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require("cli-table")

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  user: "root",

  password: "tribe22",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
  }
  start();
});

function start(){
    connection.query("SELECT * FROM products", function(err, res) {
        if(err) throw err;
        console.log("-----------------------------------------------");
       var table1 = new table ({
            head: [ "item_id", "product_name", "department_name", "price", "stock_quantity" ],
            colWidths: [10, 25, 25, 10, 10]
       });

        for (i = 0; i < res.length; i++) {
        var productArray = [ res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity ];
        table1.push(productArray);
        }
        console.log(table1.toString());
        displayData();
        
});

};


function displayData() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    buyItem(res);
  });
}

function buyItem(stock) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "item",
        message: "What is the id of the item you would like to buy? \n type 'Q' if you would like to quit",
        validate: function(val) {
          return !isNaN(val) || val.toLowerCase() === "q";
        }
      }
    ])
    .then(function(answer) {
      promptQuit(answer.item);
      var itemId = parseInt(answer.item);
      var product = checkStock(itemId, stock);


      if (product) {
        customerQuantity(product);
      }
      else {
        console.log("\nPlease enter a valid item id");
        displayData();
      }
    });
}


function customerQuantity(product) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "quantity",
        message: "Please select quantity. \nYou can enter 'Q' if you would like to quit",
        validate: function(val) {
          return val > 0 || val.toLowerCase() === "q";
        }
      }
    ])
    .then(function(res) {

      promptQuit(res.quantity);
      var quantity = parseInt(res.quantity);

    
      if (quantity > product.stock_quantity) {
        console.log("\nInsufficient quantity!");
        displayData();
      }
      else {
  
        payMoney(product, quantity);
      }
    });
}

function checkStock(itemId, stock) {
  for (var i = 0; i < stock.length; i++) {
    if (stock[i].item_id === itemId) {
      return stock[i];
    }
  }
  
  return null;
}

function payMoney(item, quantity) {
  connection.query(
    "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
    [quantity, item.item_id],
    function(err, res) {
      // Let the user know the purchase was successful, re-run loadProducts
      console.log("\nYou purchase " + quantity + " of " + item.product_name + "!");
      start();
    }
  );
}


function promptQuit(answer) {
  if (answer.toLowerCase() === "q") {

    console.log("Come again soon!");
    process.exit(0);
  }
}