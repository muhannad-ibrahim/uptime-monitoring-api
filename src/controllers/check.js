const jwt = require('jsonwebtoken');
const Check = require('../models/Check');
const User = require('../models/User');
const asyncWrapper = require('../middleware');

const createCheck = async (req, res, next) => {
    try {
    // get the user's email from the token in the cookies
        const token = req.cookies.jwt;
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userEmail = decodedToken.email;

        // find the user by email
        const promise = User.findOne({ email: userEmail });
        const [err, user] = await asyncWrapper(promise);

        if (err) {
            return next(err);
        }
        if (!user) {
            return next({ message: 'User not found' });
        }

        // create a new check with the user's ID
        const check = new Check({
            ...req.body,
            user_id: user.id,
        });

        await check.save();
        return res.status(201).json({ success: true, data: check });
    } catch (err) {
        return next({ message: err.message });
    }
};

const getChecks = async (req, res, next) => {
    try {
    // get the user's email from the token in the cookies
        const token = req.cookies.jwt;
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userEmail = decodedToken.email;

        // find the user by email
        const promise = User.findOne({ email: userEmail });
        const [err, user] = await asyncWrapper(promise);

        if (err) {
            return next(err);
        }
        if (!user) {
            return next({ message: 'User not found' });
        }

        // find all checks associated with the user's ID
        const checks = await Check.find({ user_id: user.id });

        return res.status(200).json({ success: true, data: checks });
    } catch (err) {
        return next({ success: false, error: err.message });
    }
};

// get a single check for a user by ID
const getCheckById = async (req, res, next) => {
    try {
    // get the user's email from the token in the cookies
        const token = req.cookies.jwt;
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userEmail = decodedToken.email;

        // find the user by email
        const promise = User.findOne({ email: userEmail });
        const [err, user] = await asyncWrapper(promise);

        if (err) {
            return next(err);
        }
        if (!user) {
            return next({ message: 'User not found' });
        }

        // find the check associated with the user's ID and the requested ID
        const check = await Check.findOne({ _id: req.params.id, user_id: user.id });
        if (!check) {
            return next({ message: 'Check not found' });
        }

        return res.status(200).json({ success: true, data: check });
    } catch (err) {
        return next({ message: err.message });
    }
};

// update a single check for a user by ID
const updateCheckById = async (req, res, next) => {
    try {
    // get the user's email from the token in the cookies
        const token = req.cookies.jwt;
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userEmail = decodedToken.email;

        // find the user by email
        const promise = User.findOne({ email: userEmail });
        const [err, user] = await asyncWrapper(promise);

        if (err) {
            return next(err);
        }
        if (!user) {
            return next({ message: 'User not found' });
        }

        // find and update the check associated with the user's ID and the requested ID
        const check = await Check.findOneAndUpdate({
            _id: req.params.id,
            user_id: user.id,
        }, req.body, { new: true });

        if (!check) {
            return next({ message: 'Check not found' });
        }

        return res.status(200).json({ success: true, data: check });
    } catch (err) {
        return next({ message: err.message });
    }
};

// delete a single check for a user by ID
const deleteCheckById = async (req, res, next) => {
    try {
    // get the user's email from the token in the cookies
        const token = req.cookies.jwt;
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userEmail = decodedToken.email;

        // find the user by email
        const promise = User.findOne({ email: userEmail });
        const [err, user] = await asyncWrapper(promise);

        if (err) {
            return next(err);
        }
        if (!user) {
            return next({ message: 'User not found' });
        }

        // find and delete th check associated with the user's ID and the requested ID
        const check = await Check.findOneAndDelete({ _id: req.params.id, user_id: user.id });
        if (!check) {
            return next({ message: 'Check not found' });
        }

        return res.status(200).json({ success: true, message: 'Check deleted successfully' });
    } catch (err) {
        return next({ message: err.message });
    }
};

module.exports = {
    createCheck,
    getChecks,
    getCheckById,
    updateCheckById,
    deleteCheckById,
};
