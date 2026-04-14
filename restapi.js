const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 3000;

app.use(express.json());

async function connectToMongoDB() {
    try {
        await mongoose.connect('mongodb://host.docker.internal:27017/api_kasir', {
        });
        console.log(' mongodb://host.docker.internal:27017/api_kasir');
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

const Receiptschema = new mongoose.Schema({
    name: String,
    price: Number,
    quantity: Number,
    total_price: Number,
    transaction_date: Date
});

const Receipt = mongoose.model("Receipt",Receiptschema)


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
// hebat kamu bi
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


app.post('/api/checkout',async (req,res) =>{
    try{
        const {itemid,buyquantity}=req.body;
        const item = await Items.findById(itemid);

        if(!item){
            return res.status(404).json({error:"no item found in our databases"});
        }
        
         if (item.quantity === 0){
            return res.status(403).json({error: 'barang yg kmu pinta sdh habis'});
         }
         if (item.quantity < buyquantity)
            return res.status(403).json({error:"barang yg kmu beli melebihi stock yg kami punya harap dikurangi"});
        
         item.quantity -= buyquantity;
         item.total_price = item.price * item.quantity;
         item.updated_at = new Date()
         await item.save();

         res.json({ message: 'item berhasil di checkout'})

    }
    catch(err){
       if (err.name === 'CastError'){
        return res.status(404).json({error:'id barang ini gaada di database'});   
       }
        res.status(500).json({error:'server gagal memproses checkout'});
    }


    app.get('/api/receipt',async (req,res) =>{
        try{

        }
        catch(s){}
    })
});
app.listen(port,() =>{
    console.log(`the server is running at http://localhost:${port}`);
    });
