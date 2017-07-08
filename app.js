const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongojs = require('mongojs');

// Connect to Database
const db = mongojs('catalog', ['products']);


// Init app
const app = express();
// Post
const port = 3000;

app.use(bodyParser.json());

app.get('/', (req, res, next) => {
    res.send('Please use /api/v1/products');
});

// Fetch All Products
app.get('/api/products', (req, res, next) => {
    db.products.find((err, docs) => {
        if (err) throw err;

        console.log('Products Found...');
        res.json(docs);
    });
});

// Fetch Single Product
app.get('/api/products/:id', (req, res, next) => {
      db.products.findOne({_id: mongojs.ObjectId(req.params.id)}, (err, doc) => {
        if (err) throw err;

        console.log('Products Found...');
        res.json(doc);
    });
});

// Add Product
app.post('/api/products', (req, res, next) => {
    res.send('Add Product');
});

// Update Product
app.put('/api/products/:id', (req, res, next) => {
    res.send('Update Product ' + req.params.id);
});

// Delete Product
app.delete('/api/products/:id', (req, res, next) => {
    res.send('Delete Product ' + req.params.id);
});


// Run server
app.listen(port, () => {
    console.log('Server running on localhost:' + port);
});