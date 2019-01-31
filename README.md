# Node Rest API

Write a server that provides a REST API. A lot is left for your interpretation and decision-making. In the end, one should be able to interact with the API on a server somewhere using postman or CURL with a simple key. One should also be able to build the code from the repo and run it locally.

## Local Setup

1. Clone this repo.
2. npm install
3. In local mongo, set up 'saks' database with collections 'orders', 'inventory', and 'products'
4. reference the seeds folder and inserMany into orders, inventory, and products using their corresponding json files
5. npm start

# routes

## get routes

`/products` get all products

`/products/:product_name` get by product name

`orders` get all orders

`/:order_id` get order by order id

`/inventory` get all inventory

`inventory/:prouct_id` get inventory item by product id

## post routes

`/products` - post new product with fields product_name, designer, type, price

`orders` post new order with fields product_id, count, street, city, state, zip (each order placed will update inventory accordingly)

## put routes

`products/:product_name` update product with fields product_name, designer, type, price

## delete routes

`products/:product_name` delete by product name
`orders/:order_id` delete by order id (for each cancelled order, said items will go back into inventory)
