const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protectAdmin = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded.userId);
            if (!user || user.role !== 'admin') {
                return next({
                    statusCode: 403,
                    message: 'Access denied, admin only'
                });
            }
            req.user = user;

            next();
        } catch (error) {
            return next({
                statusCode: 401,
                message: 'Not authorized, token failed'
            });
        }
    }

    if (!token) {
        return next({
            statusCode: 401,
            message: 'Not authorized, no token'
        });
    }
}

module.exports = { protectAdmin };