const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please enter a username'],
        unique: true,
        min: [4, 'Username must be at least 4 characters long'],
    },
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        lowercase: [true, 'Email must be lowercase'],
        trim: true,
        unique: [true, 'Email must be unique'],
        validate: [isEmail, 'Please enter a valid email'],
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Password must be at least 6 characters long'],
    },
    active: {
        type: Boolean,
        default: false,
    },
});

userSchema.pre('save', function preSave(next) {
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

userSchema.methods.comparePassword = function comparePassword(password) {
    return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model('user', userSchema);

module.exports = User;
