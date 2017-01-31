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

var inquirer = require('inquirer');
var mysql = require('mysql');

var connection = mysql.createConnection({
	host:"localhost",
	port:3306,
	user:"root",
	password:"baseball07",
	database:"Bamazon"
})

connection.connect(function(err){
	console.log("Connected as id: " + connection.threadId);
	//start();
})




var start = function(){
	connection.query('SELECT item_id, product_name, department_name, price, stock_quantity FROM products', function(err,res){
		if(err) {
			console.log('Display Error');
		} else {
			console.log('items for sale: ');
			for(var i = 0; i < res.length; i++) {
				console.log('#' + res[i].item_id + '\n Product: ' + res[i].product_name + '\n Price: $' + res[i].price + '\n Quantity in stock: ' + res[i].stock_quantity);
			}
		}
	})
}
start();




/* var start = function(){
	inquirer.prompt({
		name: 'choice',
		message: 'What would you like to buy?',
		type:'list',
		choices: ['Shoes','Shirts','Hats','Nothing'] */



 /* function shopItem(Shoes,Shirts,Hats) {
	this.Shoes = Shoes;
	this.Shirts = Shirts;
	this.Hats = Hats;
} 

start();
shopItem();
*/


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


