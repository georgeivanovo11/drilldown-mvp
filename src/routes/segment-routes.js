const router = require('express-promise-router')();
const SegmentController = require('./../controllers/segment-controller');

router.get('/', SegmentController.getAll);
router.get('/:id', SegmentController.getOne);
router.post('/', SegmentController.create);
router.put('/:id', SegmentController.update);
router.delete('/:id', SegmentController.delete);

module.exports = router;
