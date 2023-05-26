const express = require('express');
const dotenv = require('dotenv');
const router = require('./src/routes');

const dbConnection = require('./src/db');

// Load env vars
dotenv.config();

const { PORT } = process.env;

const app = express();

app.use(express.json());
app.use(router);

async function main() {
    try {
        await dbConnection(process.env.MONGO_URI);
    } catch (error) {
        console.error(error.message);
    }
}

// Middleware to handle errors
app.use((err, req, res, next) => {
    res.status(err.statusCode || 400).json({
        message: err.message,
    });
    next();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

main();
