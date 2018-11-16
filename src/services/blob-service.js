const azure = require('azure-storage');
const uuid = require('uuid/v1');
const fs = require('fs');

class BlobService {
  constructor() {
    this.connection = 'DefaultEndpointsProtocol=http;AccountName=devstoreaccount1;AccountKey=Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw==;BlobEndpoint=http://127.0.0.1:10000/devstoreaccount1;';
    this.blobService = azure.createBlobService(this.connection);
  }

  createContainer(container) {
    return new Promise((res, rej) => {
      this.blobService.createContainer(container, (error) => {
        if (error) {
          rej(error);
        }
        res();
      });
    });
  }

  createBlob(blob, container) {
    return new Promise((res, rej) => {
      const id = `${uuid()}:${blob.originalFilename}`;
      this.blobService.createBlockBlobFromStream(container, id, fs.createReadStream(blob.path), blob.size, blob.headers, (error) => {
        if (error) {
          rej(error);
        }
        res(id);
      });
    });
  }

  getBlobUrl(id, container) {
    const url = this.blobService.getUrl(container, id);
    return url;
  }




}

module.exports = new BlobService();
