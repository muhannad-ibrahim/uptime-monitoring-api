const mongoose = require('mongoose');

const checkSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    protocol: {
        type: String,
        enum: ['HTTP', 'HTTPS', 'TCP'],
        required: true,
    },
    path: {
        type: String,
    },
    port: {
        type: Number,
    },
    timeout: {
        type: Number,
        default: 5000,
    },
    interval: {
        type: Number,
        default: 600000,
    },
    threshold: {
        type: Number,
        default: 1,
    },
    httpHeaders: [
        {
            key: String,
            value: String,
        },
    ],
    assert: {
        statusCode: {
            type: Number,
        },
    },
    tags: [String],
    ignoreSSL: {
        type: Boolean,
        default: false,
    },
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
}, { timestamps: true });

const Check = mongoose.model('Check', checkSchema);

module.exports = Check;
