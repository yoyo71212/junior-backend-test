const mongoose = require('mongoose');
const Product = require('../models/productModel');

const addProduct = async (req, res, next) => {
    try {
        const body = req.body;

        const product = new Product(body);

        const result = await product.save();
        return res.status(201).json({
            success: true,
            message: 'Product created successfully',
            data: result
        });
    } catch (error) {
        next(error)
    }
}

const getProducts = async (req, res, next) => {
    try {
        const page = Math.max(1, parseInt(req.query.page) || 1);
        const limit = 10;
        const skip = (page - 1) * limit;

        const totalProducts = await Product.countDocuments();
        const totalPages = Math.ceil(totalProducts / limit);

        const products = await Product.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
        return res.status(200).json({
            success: true,
            message: 'Products fetched successfully',
            data: {
                page,
                limit,
                totalProducts,
                totalPages,
                products
            }
        });
    } catch (error) {
        next(error);
    }
}

const getProductById = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return next({
                statusCode: 400,
                message: 'Invalid product ID'
            });
        }

        const product = await Product.findById(id);
        if (!product) {
            return next({
                statusCode: 404,
                message: 'Product not found'
            });
        }
        return res.status(200).json({
            success: true,
            message: 'Product fetched successfully',
            data: product
        });
    } catch (error) {
        next(error);
    }
}

const updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const body = req.body;
        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return next({
                statusCode: 400,
                message: 'Invalid product ID'
            });
        }

        const product = await Product.findByIdAndUpdate(id, body, { returnDocument: 'after', runValidators: true });
        if (!product) {
            return next({
                statusCode: 404,
                message: 'Product not found'
            });
        }
        return res.status(200).json({
            success: true,
            message: 'Product updated successfully',
            data: product
        });
    } catch (error) {
        next(error);
    }
}

const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return next({
                statusCode: 400,
                message: 'Invalid product ID'
            });
        }

        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return next({
                statusCode: 404,
                message: 'Product not found'
            });
        }
        return res.status(200).json({
            success: true,
            message: 'Product deleted successfully'
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    addProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
};