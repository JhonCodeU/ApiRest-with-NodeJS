const express = require('express');
const faker = require('faker');
const app = express();
const port = 3100;

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/new-route', (req, res) => res.send('Hello I am new route!'));

app.get('/products', (req, res) => {
  const products = []
  const { size } = req.query;
  const limit = size || 10
  for (let index = 0; index < limit; index++) {
    products.push({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price()),
      image: faker.image.imageUrl()
    })
  }
  res.send(products)
});

app.get('/products/filter', (req, res) => {
  res.send('I am a filter')
})


app.get('/products/:id', (req, res) => {
  const {id} = req.params;
  res.json({
    id,
    name: 'Product 1',
    price: 1000,
  });
})

app.get('/users', (req, res) => {
  const { limit, offset } = req.query;
  if (limit && offset) {
    res.json({
      limit,
      offset,
    })
  } else {
    res.send('Please provide limit and offset');
  }
})

app.get('/categories/:categoryId/products/:productId', (req, res) => {
  const {categoryId, productId} = req.params;
  res.json({
    categoryId,
    productId,
  });
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

