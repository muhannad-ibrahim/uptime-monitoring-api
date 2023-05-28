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
 *               // Specify the properties for the request body here
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
 *     summary: Get reports for a check by ID
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

router.get('/reports', checkController.getCheckReportsById);

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
 *             // Specify the schema for the request body here
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
