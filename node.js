const fs = require("fs");

// Add the item indicated by the value passed
// to the `orders` array.
function addOrder(value) {
  console.log(value);
  const item = menu.find((v) => v.name === value); // use '===' for comparison
  if (item) {
    orders.push(item);
  } else console.log("This item is currently unavailable!");
}

// List (to the console) all the current orders that have been added
function listOrders() {
  console.log(
    orders.length > 0
      ? orders.map((o) => o.name).join(", ")
      : "No orders to list!"
  );
}

// Output (to the console) the total price of all the current orders
function dueAmount() {
  console.log(
    orders.length > 0
      ? orders.map((o) => o.price).reduce((a, price) => a + price)
      : "0.00"
  );
}

// List (to the console) only the kind of items passed
function only(kind) {
  console.log(
    menu
      .filter((m) => m.kind === kind)
      .map((m) => m.name)
      .join(", ")
  );
}

// Fullfill and remove the oldest order
function fulfillOrder() {
  if (orders.length > 0) {
    const fulfilledOrder = orders.shift();
    console.log(`Fulfilled order: ${fulfilledOrder.name}`);
  } else {
    console.log("No orders to fulfill!");
  }
}

// Output (to the console) the cheapest item on menu
function cheapestItem() {
  if (menu.length > 0) {
    let cheapest = menu[0];
    for (let i = 1; i < menu.length; i++) {
      if (menu[i].price < cheapest.price) {
        cheapest = menu[i];
      }
    }
    console.log(`Cheapest item: ${cheapest.name} - $${cheapest.price}`);
  } else {
    console.log("No items to list");
  }
}

// Map the function names to the functions to call
const fns = {
  addOrder: addOrder,
  listOrders: listOrders,
  dueAmount: dueAmount,
  drinksOnly: () => only("drink"),
  foodOnly: () => only("food"),
  // additional functions
  fulfillOrder: fulfillOrder,
  cheapestItem: cheapestItem,
};

// Program logic starts here

// Read the menu file and the order file
//  arg 1 is this program file,
//  arg 2 the menu file to read,
//  arg 3 is the command file to read

const menu = JSON.parse(fs.readFileSync(process.argv[2])).menu;

const commands = JSON.parse(fs.readFileSync(process.argv[3]));

// Create the initially-empty order queue
const orders = [];

// Process each order found in the commands
commands.orders.forEach((cmd) => {
  fns[cmd.command](cmd.value);
});

// Run: node node.js menu.json orders.json

// Bugs: missing fullfillorder and cheapestItem function, === comparison in addOrder
