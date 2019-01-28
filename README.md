# The homework
Write a server that provides a REST API. A lot is left for your interpretation and decision-making. In the end, one should be able to interact with the API on a server somewhere using postman or CURL with a simple key. One should also be able to build the code from the repo and run it locally.

# Write the code
Fork this repo. Use any programming language, framework, database, etc.

## Required Models

**Product**

Write a basic CRUD API for this model with the following required fields:
- price
- product name
- type (ex. Jewelry, Shoes, Men's Shirts, etc)

**Inventory**

Write a basic CRUD API for this with the following required fields:
- product ID
- count (amount in inventory)

**Order**

Write a basic CRUD API for this  with the following required Fields
- product ID
- count (amount of product in the order)
- address

**IMPORTANT FUNCTIONAL REQUIREMENT:** maintain coherence between order counts and inventory counts. For instance, when an order is created, the application should subtract from inventory. When an order is deleted, the application should add back the order's items to the inventory.

# Secure the API
Use SSL. Endpoints should be secured using some kind of token. For simplicity, you can just create an endpoint that will give a user a token if they use a secret password.

# Run locally
Someone should be to pull down your branch and, fairly easily, run the code locally.

# Deploy it and create a PR
Deploy it somewhere Heroku, AWS, Google Cloud, etc.  Create a PR back to this repo from your fork and include the URL to the deployed app.

# BONUS: Dockerize the application
For bonus points, create a Dockerfile so anyone with the repo can build a docker image
