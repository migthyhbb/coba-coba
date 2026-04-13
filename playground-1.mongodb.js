// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use('api_kasir');

// Create a new document in the collection
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.

// Create a new document in the collection.
db.getCollection('kasir_users').insertOne({
    "id":0,
    "user":"administrator",
    "password":"admin123",
    "role":"admin",
    "created_at": new Date(),
    "updated_at": new Date(),
    "last_login": new Date(),
});
db.getCollection('kasir_users').insertOne({
    "id":1,
    "user":"mamat",
    "password":"kasir123",
    "role":"kasir",
    "created_at": new Date(),
    "updated_at": new Date(),
    "last_login": new Date(),
});

db.getCollection('items').insertOne({
    "name":"Nasi Goreng",
    "price":15000,
    "quantity":1,
    "total_price":15000,
    "updated_at": new Date(),
});
db.getCollection('items').insertOne({
    "name":"Mie Goreng",
    "price":12000,
    "quantity":1,
    "total_price":12000,
    "updated_at": new Date(),
});


