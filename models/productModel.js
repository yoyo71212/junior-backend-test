const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String
    },
    price: {
        type: Number,
        required: true,
        gt: 0
    },
    quantity: {
        type: Number,
        required: true,
        gte: 0
    }
}, {timestamps: true});

module.exports = mongoose.model('Product', productSchema);