const { body, validationResult } = require('express-validator');

const validateProductCreate = [
    body('name')
        .exists().withMessage('Name is required').bail()
        .isString().withMessage("Name must be a string").bail()
        .trim()
        .notEmpty().withMessage("Name cannot be empty"),

    body('category')
        .optional()
        .isString().withMessage('Category should be a string').bail()
        .trim()
        .notEmpty().withMessage('Category cannot be empty'),

    body('price')
        .exists().withMessage('Price is required').bail()
        .isFloat({ min: 0 }).withMessage("Price must be a non-negative float"),

    body('quantity')
        .exists().withMessage('Quantity is required').bail()
        .isInt({ min: 0 }).withMessage('Quantity must be a non-negative integer')
];

const validateProductUpdate = [
    body('name')
        .optional()
        .isString().withMessage('Name must be a string').bail()
        .trim()
        .notEmpty().withMessage('Name cannot be empty'),

    body('category')
        .optional()
        .isString().withMessage('Category should be a string').bail()
        .trim()
        .notEmpty().withMessage('Category cannot be empty'),

    body('price')
        .optional()
        .isFloat({ min: 0 }).withMessage("Price must be a non-negative float"),

    body('quantity')
        .optional()
        .isInt({ min: 0 }).withMessage('Quantity must be a non-negative integer')
];

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

module.exports = {
    validateProductCreate,
    validateProductUpdate,
    handleValidationErrors
};