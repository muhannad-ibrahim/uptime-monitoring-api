const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const asyncWrapper = require('../middleware');
const User = require('../models/User');

dotenv.config();
const { JWT_SECRET } = process.env;

const signup = async (req, res, next) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    });

    const promise = user.save();
    const [err, data] = await asyncWrapper(promise);

    if (err) {
        return next(err);
    }
    return res.json({ message: 'success', data });
};

const login = async (req, res, next) => {
    const { email, password } = req.body;
    const promise = User.findOne({ email }).exec();
    const [err, user] = await asyncWrapper(promise);

    if (err) {
        return next(err);
    }
    if (!user) {
        return next({ message: 'User not found' });
    }
    const valid = user.comparePassword(password);

    if (!valid) {
        return next({ message: 'UNAUTHENTICATED to login' });
    }

    const token = jwt.sign({
        id: user.id,
        username: user.username,
        email,
        active: user.active,
    }, JWT_SECRET, { expiresIn: '4h' });

    try {
        res.cookie('jwt', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 4 });
    } catch (error) {
        return next({ message: error.message });
    }

    return res.json({ message: 'success', token });
};

const auth = (req, res, next) => {
    const token = req.cookies.jwt;

    if (!token) {
        return next({ message: 'Unauthorized' });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedToken;
        return res.json({ message: 'Authenticated' });
    } catch (error) {
        return next({ message: 'Un Authenticated' });
    }
};

const logout = async (req, res) => {
    res.clearCookie('jwt');
    res.json({ message: 'User logged out' });
};

module.exports = {
    signup,
    login,
    auth,
    logout,
};
