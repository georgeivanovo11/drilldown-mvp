const BlobService = require('./../services/blob-service');

class StorageController {
  createContainer(req, res) {
    const name = req.params.name;
    BlobService.createContainer(name).then(
      (data) => { res.status(201).send(data) },
      (error) => { res.status(400).send(error) }
    );
  }

  getBlobUrl(req, res) {
    const containerId = req.params.c_id;
    const blobId = req.params.b_id;
    const url = BlobService.getBlobUrl(blobId, containerId);
    res.send(url);
  }
}

module.exports = new StorageController();
