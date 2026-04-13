const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 3000;

app.use(express.json());

async function connectToMongoDB() {
    try {
        await mongoose.connect('mongodb://localhost:27017/api_kasir', {
        });
        console.log('Connected to MongoDB: mongodb://localhost:27017/');
    } catch (err) {
        console.error('MongoDB connection error: %s \n', err);
    }
}

connectToMongoDB();

const ItemsSchema = new mongoose.Schema({
    name: String,
    price: Number,
    quantity: Number,
    total_price: Number,
    updated_at: Date
});

const Items = mongoose.model('Items', ItemsSchema);


app.get('/api/items',async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const items = await Items.find().skip((page - 1) * limit).limit(limit);
        
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch items' });
    }
    
});

app.put('/api/items/:id', async (req, res) => {
   try {
       const itemId = req.params.id;
       const { name, price, quantity } = req.body;
        const pricelama = await Items.findById(itemId);
        if (!pricelama) {
            return res.status(404).json({ error: 'Item not found' });
        }
        const new_price = req.body.price || pricelama.price;
        const new_quantity = req.body.quantity || pricelama.quantity;
        const total_price = new_price * new_quantity;
        await Items.findByIdAndUpdate(itemId, {
            name,
            price: new_price,
            quantity: new_quantity,
            total_price,
            updated_at: new Date()
        });
        res.json({ message: 'Item updated successfully' });
   } catch (err) {
        res.status(500).json({ error: 'Server Failed to update item' });
    }
});

app.delete('/api/items/:id', async (req, res) => {
    try {
        const itemId = req.params.id;
        const item = await Items.findById(itemId);
        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }
        await Items.findByIdAndDelete(itemId);
        res.json({ message: 'Item deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Server Failed to delete item' });
    }
});


app.listen(port,() =>{
    console.log(`the server is running at http://localhost:${port}`);
    });
