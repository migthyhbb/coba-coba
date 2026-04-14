const { Db } = require("mongodb");

{
use(database_kasir_api);

db.createCollection("items");
db.items.insertMany([
    {
        name: "Indomie Goreng",
        price: 3000,
        quantity: 10,
        total_price: 30000,
        updated_at: new Date()
    }
]);
}
