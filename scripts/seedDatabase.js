require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const connectDB = require("../config/db");
const User = require("../models/userModel");
const Product = require("../models/productModel");

const seedDatabase = async () => {
    try {
        await connectDB();

        console.log("Clearing database...");

        await User.deleteMany({});
        await Product.deleteMany({});

        console.log("Seeding users...");

        const adminPassword = await bcrypt.hash("admin123", 10);
        const userPassword = await bcrypt.hash("user123", 10);

        const users = await User.insertMany([
            {
                username: "admin",
                password: adminPassword,
                role: "admin"
            },
            {
                username: "user",
                password: userPassword,
                role: "user"
            }
        ]);

        console.log("Seeding products...");

        await Product.insertMany([
            {
                name: "Laptop",
                category: "Electronics",
                price: 1200,
                quantity: 5
            },
            {
                name: "Phone",
                category: "Electronics",
                price: 800,
                quantity: 10
            },
            {
                name: "Desk Chair",
                category: "Furniture",
                price: 150,
                quantity: 20
            },
            {
                name: "Headphones",
                category: "Electronics",
                price: 100,
                quantity: 50
            }
        ]);

        console.log("Database seeded successfully!");
        process.exit(0);

    } catch (err) {
        console.error("Seeding failed:", err);
        process.exit(1);
    }
};

seedDatabase();