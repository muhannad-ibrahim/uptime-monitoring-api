const router = require('express').Router();
const { checkController } = require('../controllers');

router.post('/', checkController.createCheck);
router.get('/', checkController.getChecks);
router.get('/reports', checkController.getCheckReportsById);
router.put('/:id', checkController.updateCheckById);
router.delete('/:id', checkController.deleteCheckById);

module.exports = router;
