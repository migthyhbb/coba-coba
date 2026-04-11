const e = require('express');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 3000;

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/api_kasir', { useUnifiedTopology: true })
.then(() => 
    { console.log('Connected to MongoDB: mongodb://localhost:27017/'); })
.catch((err) =>
    { console.error('MongoDB connection error: %s \n', err); 
});

app.get('/api/items', (req, res) => {
    res.json({ message: 'Get all items' });
});

app.post('/api/items', (req, res) => {
    const { items, price, quantity } = req.body;

    if (!items || !price || !quantity) {
        return res.status(400).json({ error: 'Items, price, and quantity are required' });
    }

    return res.status(201).json({ message: 'Item created successfully' });
});


app.listen(port,() =>{
    console.log(`the server is running at http://localhost:${port}`);
    });
