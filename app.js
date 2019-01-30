const express = require('express');
const bodyParser = require('body-parser');
const productRouter = require('./routes/productRoutes');

const app = express();
// const { port } = process.env || 3000;
const port = 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use('/products', productRouter);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
