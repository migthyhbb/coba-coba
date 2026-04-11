// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use('rest_kasir_database');

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
    "id":1,
    "items":"Nasi Goreng",
    "price":15000,
    "quantity":1,
    "total_price":15000,
});
db.getCollection('items').insertOne({
    
    "id":2,
    "items":"Mie Goreng",
    "price":12000,
    "quantity":1,
    "total_price":12000,


});
