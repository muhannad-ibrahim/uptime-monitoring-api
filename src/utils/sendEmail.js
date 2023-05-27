const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const sendStatusChangeNotification = async (check, userEmail) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'hotmail',
            auth: {
                user: process.env.EMAIL_ADDRESS,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_ADDRESS,
            to: userEmail,
            subject: `Status change for URL check "${check.name}"`,
            text: `The status for your check "${check.name}" has changed to "${check.status}".`,
        };

        await transporter.sendMail(mailOptions);
        console.log(`Notification email sent to ${userEmail}`);
    } catch (err) {
        console.log(`Error sending notification email to ${userEmail}: ${err.message}`);
    }
};

module.exports = {
    sendStatusChangeNotification,
};
