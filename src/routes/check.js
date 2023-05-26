const router = require('express').Router();
const { checkController } = require('../controllers');

router.post('/', checkController.createCheck);
router.get('/', checkController.getChecks);
router.get('/:id', checkController.getCheckById);
router.put('/:id', checkController.updateCheckById);
router.delete('/:id', checkController.deleteCheckById);

module.exports = router;
