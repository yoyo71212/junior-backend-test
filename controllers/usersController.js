const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/userModel');

const JWT_SECRET = process.env.JWT_SECRET;

const createToken = (_id) => {
    return jwt.sign({
        userId: _id
    }, JWT_SECRET, { expiresIn: '1h' });
};

const registerUser = async (req, res, next) => {
    try {
        const { username, password, role } = req.body;
        if (!username || !password) {
            return next({
                statusCode: 400,
                message: 'Username and password are required'
            });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return next({
                statusCode: 400,
                message: 'Username already exists'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const userRole = (role == 'admin') ? 'admin' : 'user';
        const user = new User({ username, password: hashedPassword, role: userRole });
        await user.save();

        const token = createToken(user._id);

        return res.status(201).json({ username, token });
    } catch (error) {
        next(error);
    }
};

const loginUser = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return next({
                statusCode: 400,
                message: 'Username and password are required'
            });
        }
        
        const user = await User.findOne({ username });
        if (!user) {
            return next({
                statusCode: 401,
                message: 'Invalid username or password'
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return next({
                statusCode: 401,
                message: 'Invalid username or password'
            });
        }

        const token = createToken(user._id, user.role);

        return res.json({ token });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    registerUser,
    loginUser
};