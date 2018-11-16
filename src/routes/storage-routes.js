const router = require('express-promise-router')();
const StorageController = require('./../controllers/storage-controller');

router.post('/container/:name', StorageController.createContainer);
router.get('/container/:c_id/blob/:b_id', StorageController.getBlobUrl);

module.exports = router;
