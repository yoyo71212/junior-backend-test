const express = require('express');
const router = express.Router();

const {
    addProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
} = require('../controllers/productsController');

const {
    validateProductCreate,
    validateProductUpdate,
    handleValidationErrors
} = require('../middleware/validationMiddleware');

router.post('/', validateProductCreate, handleValidationErrors, addProduct);

router.get('/', getProducts);

router.get('/:id', getProductById);

router.put('/:id', validateProductUpdate, handleValidationErrors, updateProduct);

router.delete('/:id', deleteProduct);

module.exports = router;