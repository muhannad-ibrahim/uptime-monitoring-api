const mongoose = require('mongoose');
const dotenv = require('dotenv');
const asyncWrapper = require('./middleware');

dotenv.config();

module.exports = async (URL) => {
    const [err] = await asyncWrapper(mongoose.connect(URL));
    if (err) {
        console.log('could not connect to DB', err.message);
        return;
    }
    console.log('Database connected');
};
