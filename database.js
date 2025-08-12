const { MongoClient } = require("mongodb");

let _db;

async function connectDB() {
    try {
        const client = new MongoClient(process.env.MONGODB_URI);
        await client.connect();
        _db = client.db(process.env.MONGODB_DB_NAME);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        process.exit(1);
    }
}

function getDB() {
    if (!_db) {
        throw new Error("Database not initialized!");
    }
    return _db;
}

module.exports = { connectDB, getDB };

