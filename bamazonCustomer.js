const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: 'localhost',
    port: 8889,
    user: 'root',
    password: 'root',
    database: 'bamazon_db'
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    showItems();
    buyItem();
});

function showItems() {
    connection.query("SELECT * FROM products",
        function (err, res) {
            if (err) throw err;

            res.forEach(row => {
                console.log(`${row.item_id} ${row.product_name} ${row.price}`);
            })
        });
}

function buyItem() {
    inquirer.prompt([
        {
            "type": "input",
            "name": "item_id",
            "message": "What is the ID of the item you want to buy?",
        },
        {
            "type": "input",
            "name": "buy_quantity",
            "message": "How many do you want to buy?",
        }

    ]).then(response => {
        // UPDATE products SET ? WHERE ?, []
        connection.query("SELECT * FROM products WHERE ?", { item_id: response.item_id },
            function (err, res) {
                if (err) throw err;
                var updatedStock = res[0].stock_quantity - response.buy_quantity;
                if (res[0].stock_quantity - response.buy_quantity > -1) {
                    console.log(`
                    ----- RECEIPT -----
                    product name: ${res[0].product_name}
                    product ID: ${res[0].item_id}
                    price: ${res[0].price}
                    quantity: ${response.buy_quantity}
                    total price: ${res[0].price * response.buy_quantity}
                    `)
                } else {
                    console.log("Sorry, this is out of stock")
                }
            })
    });
}

function inventory(updatedStock) {
    connection.query("UPDATE products SET ? WHERE ?", [{ item_id: response.item_id }, { stock_quantity: updatedStock }],
        function (err, res) {
            if (err) throw err;
        })
    connection.end();
}