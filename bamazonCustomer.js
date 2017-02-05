/* (1) Running this application will first display all of the 
items available for sale. Include the ids, names, and prices of products for sale.

(2)The app should then prompt users with two messages.
The first should ask them the ID of the product they would like to buy.
The second message should ask how many units of the product they would like to buy.
Once the customer has placed the order, your application should check if your store 
has enough of the product to meet the customer's request.

If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.
However, if your store does have enough of the product, you should fulfill the customer's order.

This means updating the SQL database to reflect the remaining quantity.
Once the update goes through, show the customer the total cost of their purchase. */

//Required files to run program. 
var inquirer = require('inquirer');
var mysql = require('mysql');

//Connection mySQL database
var connection = mysql.createConnection({
	host:"localhost",
	port:3306,
	user:"root",
	password:"baseball07",
	database:"Bamazon"
});

//Show if connection is working. If not throw error.
connection.connect(function(err){
	console.log("Connected as id: " + connection.threadId);
	 searchDatabase();
});

// Pulls data from products data
var searchDatabase = function() {
        var query = 'SELECT * FROM products';
        connection.query(query, function(err, res) {
            console.log('\n');
            for (var i = 0; i < res.length; i++) {
                console.log("Item ID:  " + res[i].item_id + " || Product Name: " + res[i].product_name + " || Department: " + res[i].department_name + " || Price: " + res[i].price + " || Quanity: " + res[i].stock_quantity);
            }
        });
        selectItem();
};

// Allows user to make a selection of the current inventory.
var selectItem = function() {
        
    inquirer.prompt([{
        name: 'id',
        type: 'input',
        message: 'Please Select ID of the item you would like to buy?',
        validate: function(value) {
            if (isNaN(value) == false) {
                return true;

            } else {
                console.log('\nAdd a valid ID number.\n');
                return false;
            } 
        } 

    	}, {

        name: 'total',
        type: 'input',
        message: 'How many would you like to buy?',
        validate: function(value) { 
            if (isNaN(value) == false) {                
                return true;
            } else {        
                console.log('\nPlease supply total\n');
                return false;
            } 
        } 
        
    	}]).then(function(answer) {         
            console.log(answer);
            IntItem = parseInt(answer.total);
            console.log(IntItem);
            connection.query("SELECT * FROM products WHERE ?", [{item_id: answer.id}], function(err, data) { 
                if (err) throw err;
                if (data[0].stock_quantity < IntItem) {
                console.log("Sorry, the quanity selected is currently not availible, please make another selection");
                searchDatabase();
                }   
                else {
                    //Setting a new quantity for the item
                    var newQuantity = data[0].stock_quantity - IntItem;
                    //Calculating the total price
                    var totalPrice = data[0].price * IntItem;
                    //Updating the table inventory
                    connection.query('UPDATE products SET stock_quantity = ? WHERE item_id = ?', [newQuantity, answer.id], function(err, results) {
                        if (err) throw err;
                        else {
                            console.log("Congrats on your purchase! Your total cost is $"+ totalPrice);
                            purchaseMore();
                        }
                    });  
                }
            });
        });
      
}; 

//Asks if the user would like to make another purchase
var purchaseMore = function() {
    inquirer.prompt({
        type: "confirm",
        message: "Would you like to make another purchase?",
        name: "confirm",
        default: true
    
        }).then(function(answer) {
            if (answer.confirm)
            {
                searchDatabase();
            }
            else {
                console.log("Please come back again!")
            }
        });  
}



//Grabs the data from mySQL.


/* First Challenged Finished */ 

/* Second Challenge Started */

/* (1)List a set of menu options:
		* View Products for Sale
		* View Low Inventory
        * Add to Inventory
		* Add New Product

If a manager selects View Products for Sale, the app should list every available item: the item IDs,
names, prices, and quantities.

If a manager selects View Low Inventory, then it should list all items with a inventory count lower 
than five.

If a manager selects Add to Inventory, your app should display a prompt that will let the manager
 "add more" of any item currently in the store.

If a manager selects Add New Product, it should allow the manager to add a completely new 
product to the store.*/

/* Second Challenge Finished */

/* Third Challenge Started */


