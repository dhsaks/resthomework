const express = require('express');
const bodyParser = require('body-parser');
const productRouter = require('./routes/productRoutes');
const inventoryRouter = require('./routes/inventoryRoutes');
const orderRouter = require('./routes/orderRoutes');

const app = express();
// const { port } = process.env || 3000;
const port = 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use('/products', productRouter);
app.use('/inventory', inventoryRouter);
app.use('/orders', orderRouter);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
