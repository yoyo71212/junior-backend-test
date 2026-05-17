require("dotenv").config();
const express = require("express");

const connectDB = require("./config/db");
const userRoutes = require("./routes/usersRoutes");
const productsRoutes = require('./routes/productsRoutes');
const errorHandler = require('./middleware/errorMiddleware');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}...`);
    });
});

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.get('/', (req, res) => {
    res.send('Welcome to Product Inventory System!');
});

app.use('/auth', userRoutes);
app.use('/products', productsRoutes);

app.use(errorHandler);