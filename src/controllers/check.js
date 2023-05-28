/* eslint-disable max-len */
/* eslint-disable no-plusplus */
const jwt = require('jsonwebtoken');
const Check = require('../models/Check');
const User = require('../models/User');
const asyncWrapper = require('../middleware');
const { sendEmail, timeCalculation } = require('../utils');

const createCheck = async (req, res, next) => {
    try {
        // get the user's email from the token in the cookies
        const token = req.cookies.jwt;
        if (!token) {
            return next({ message: 'No token provided' });
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userEmail = decodedToken.email;

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
            history: [
                {
                    status: 'UP',
                    responseTime: 0,
                },
            ],
        });

        await check.save();
        return res.status(201).json({ success: true, data: check });
    } catch (err) {
        return next({ message: err.message });
    }
};

const getChecks = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return next({ message: 'No token provided' });
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userEmail = decodedToken.email;

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

// update a single check for a user by ID
const updateCheckById = async (req, res, next) => {
    try {
        const start = Date.now();
        // get the user's email from the token in the cookies
        const token = req.cookies.jwt;
        if (!token) {
            return next({ message: 'No token provided' });
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userEmail = decodedToken.email;

        const promise = User.findOne({ email: userEmail });
        const [err, user] = await asyncWrapper(promise);

        if (err) {
            return next(err);
        }
        if (!user) {
            return next({ message: 'User not found' });
        }

        const check = await Check.findOne({ _id: req.params.id, user_id: user.id });
        if (!check) {
            return next({ message: 'Check not found' });
        }

        const newStatus = req.body.status;

        const lastStatus = check.history[check.history.length - 1].status;
        const newResponseTime = Date.now() - start;
        const lastResponseTime = check.history[check.history.length - 1].responseTime;
        const newLogEntry = {
            status: newStatus,
            responseTime: newResponseTime,
        };
        const newHistory = [...check.history, newLogEntry];
        const downtime = timeCalculation.calculateDowntime(newHistory);
        const uptime = timeCalculation.calculateUptime(newHistory);
        const totalSeconds = newHistory.length;
        const availability = timeCalculation.calculateAvailability(totalSeconds, downtime);
        const outages = timeCalculation.calculateOutages(newHistory);
        const avgResponseTime = timeCalculation.calculateAverageResponseTime(newHistory, lastResponseTime);
        check.status = newStatus;
        check.availability = availability;
        check.outages = outages;
        check.downtime = downtime;
        check.uptime = uptime;
        check.responseTime = avgResponseTime;
        check.history = newHistory;

        await check.save();

        // send email notification if the status has changed
        // and the user has opted in for notifications
        if (lastStatus !== newStatus) {
            console.log('Sending email notification');
            sendEmail.sendStatusChangeNotification(check, user.email);
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
        if (!token) {
            return next({ message: 'No token provided' });
        }
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

const getCheckReportsById = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return next({ message: 'No token provided' });
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userEmail = decodedToken.email;

        const promise = User.findOne({ email: userEmail });
        const [err, user] = await asyncWrapper(promise);

        if (err) {
            return next(err);
        }
        if (!user) {
            return next({ message: 'User not found' });
        }

        const check = await Check.findOne({ url: req.body.url, user_id: user.id });
        if (!check) {
            return next({ message: 'Check not found' });
        }
        const totalSeconds = check.history.length;
        const availability = timeCalculation.calculateAvailability(totalSeconds, check.downtime);
        const downtime = timeCalculation.calculateDowntime(check.history);
        const uptime = timeCalculation.calculateUptime(check.history);
        const outages = timeCalculation.calculateOutages(check.history);
        const responseTime = timeCalculation.calculateAverageResponseTime(check.history);

        return res.status(200).json({
            success: true,
            data: {
                availability,
                outages,
                downtime,
                uptime,
                responseTime,
                history: check.history,
            },
        });
    } catch (err) {
        return next({ message: err.message });
    }
};

module.exports = {
    createCheck,
    getChecks,
    updateCheckById,
    getCheckReportsById,
    deleteCheckById,
};
