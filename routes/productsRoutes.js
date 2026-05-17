const express = require('express');
const router = express.Router();

const {
    addProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
} = require('../controllers/productsController');

const { protectAdmin } = require("../middleware/protectAdmin");

const {
    validateProductCreate,
    validateProductUpdate,
    handleValidationErrors
} = require('../middleware/validationMiddleware');

router.post('/', protectAdmin, validateProductCreate, handleValidationErrors, addProduct);

router.get('/', getProducts);

router.get('/:id', getProductById);

router.put('/:id', protectAdmin, validateProductUpdate, handleValidationErrors, updateProduct);

router.delete('/:id', protectAdmin, deleteProduct);

module.exports = router;