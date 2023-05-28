const router = require('express').Router();
const { checkController } = require('../controllers');

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

/**
 * @swagger
 * /check/tags/{tag}:
 *   get:
 *     summary: Get reports for checks with a specific tag
 *     parameters:
 *       - in: path
 *         name: tag
 *         required: true
 *         schema:
 *           type: string
 *         description: The tag used to filter the checks and retrieve the reports
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
 *                     type: object
 *                     properties:
 *                       checkId:
 *                         type: string
 *                       url:
 *                         type: string
 *                       history:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             status:
 *                               type: string
 *                             responseTime:
 *                               type: number
 */

router.get('/tags/:tag', checkController.getReportsByTag);

module.exports = router;
