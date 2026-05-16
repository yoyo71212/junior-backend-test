require("dotenv").config();
const express = require("express");

const connectDB = require("./config/db");
const productsRoutes = require('./routes/productsRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}...`);
    });
});

app.get('/', (req, res) => {
    res.send('Welcome to Product Inventory System!');
});

app.use('/products', productsRoutes);