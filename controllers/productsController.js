const Product = require('../models/productModel');

const addProduct = async (req, res) => {
    try {
        const body = req.body;

        const product = new Product(body);

        const result = await product.save();
        return res.send(`Product added successfully: ${result}`);
    } catch (error) {
        return res.status(500).send('Error adding product');
    }
}

const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        return res.json(products);
    } catch (error) {
        return res.status(500).send('Error fetching products');
    }
}

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).send('Product not found');
        }
        return res.json(product);
    } catch (error) {
        return res.status(500).send('Error fetching product');
    }
}

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const body = req.body;
        
        const product = await Product.findByIdAndUpdate(id, body, { returnDocument: 'after' });
        if (!product) {
            return res.status(404).send('Product not found');
        }
        return res.json(product);
    } catch (error) {
        return res.status(500).send('Error updating product');
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).send('Product not found');
        }
        return res.send('Product deleted successfully');
    } catch (error) {
        return res.status(500).send('Error deleting product');
    }
}

module.exports = {
    addProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
};