const router = require('express').Router();
const { checkController } = require('../controllers');
/*
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
    status: {
        type: String,
        enum: ['UP', 'DOWN'],
        default: 'UP',
    },
    availability: {
        type: Number,
        default: 100,
    },
    outages: {
        type: Number,
        default: 0,
    },
    downtime: {
        type: Number,
        default: 0,
    },
    uptime: {
        type: Number,
        default: 0,
    },
    responseTime: {
        type: Number,
        default: 0,
    },
    history: [
        {
            timestamp: {
                type: Date,
                default: Date.now,
            },
            status: {
                type: String,
                enum: ['UP', 'DOWN'],
            },
            responseTime: Number,
        },
    ],
*/
/**
 * @swagger
 * /check:
 *   post:
 *     summary: Create a new check
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 required: true
 *               url:
 *                 type: string
 *                 required: true
 *               protocol:
 *                 type: string
 *                 enum: [HTTP, HTTPS, TCP]
 *                 required: true
 *               path:
 *                 type: string
 *               port:
 *                 type: number
 *               timeout:
 *                 type: number
 *                 default: 5000
 *               interval:
 *                 type: number
 *                 default: 600000
 *               threshold:
 *                 type: number
 *                 default: 1
 *               httpHeaders:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     key:
 *                       type: string
 *                     value:
 *                       type: string
 *               assert:
 *                 type: object
 *                 properties:
 *                   statusCode:
 *                     type: number
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               ignoreSSL:
 *                 type: boolean
 *                 default: false
 *     responses:
 *       201:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Check'
 */

router.post('/', checkController.createCheck);

/**
 * @swagger
 * /check:
 *   get:
 *     summary: Get all checks
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Check'
 */

router.get('/', checkController.getChecks);

/**
 * @swagger
 * /check/reports:
 *   get:
 *     summary: Get reports for a check by URL
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *                 required: true
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   // Specify the properties for the response data here
 */

router.get('/reports', checkController.getCheckReportsByURL);

/**
 * @swagger
 * /check/{id}:
 *   put:
 *     summary: Update a check by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 required: true
 *               url:
 *                 type: string
 *                 required: true
 *               protocol:
 *                 type: string
 *                 enum: [HTTP, HTTPS, TCP]
 *                 required: true
 *               path:
 *                 type: string
 *               port:
 *                 type: number
 *               timeout:
 *                 type: number
 *                 default: 5000
 *               interval:
 *                 type: number
 *                 default: 600000
 *               threshold:
 *                 type: number
 *                 default: 1
 *               httpHeaders:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     key:
 *                       type: string
 *                     value:
 *                       type: string
 *               assert:
 *                 type: object
 *                 properties:
 *                   statusCode:
 *                     type: number
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               ignoreSSL:
 *                 type: boolean
 *                 default: false
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Check'
 */

router.put('/:id', checkController.updateCheckById);

/**
 * @swagger
 * /check/{id}:
 *   delete:
 *     summary: Delete a check by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 */

router.delete('/:id', checkController.deleteCheckById);

module.exports = router;
