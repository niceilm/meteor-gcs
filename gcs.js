// Write your package code here!
// Variables exported by this module can be imported by other packages and
// applications. See gcs-tests.js for an example of importing.
import {Meteor} from "meteor/meteor";


export class GoogleCloudStorage {
  bucketId;
  bucket;
  gcs;
  multerUploader;

  constructor({projectId, credentials, bucketId}) {
    this.bucketId = bucketId;
    const gcloud = require('google-cloud');
    this.gcs = gcloud.storage({projectId, credentials});
    this.bucket = this.gcs.bucket(bucketId);

    const multer = require('multer');
    this.multerUploader = Meteor.wrapAsync(multer({
      storage: multer.MemoryStorage,
      limits: {
        fileSize: 10 * 1024 * 1024 // no larger than 5mb
      }
    }).single('file'));
  }

  uploadByRequest(req, res) {
    this.multerUploader(req, res);
    if (!req.file) {
      return;
    }
    const mime = require('mime-types');
    const destination = `${Date.now()}-${req.file.originalname}`;
    req.file.mimetype = req.file.mimetype == 'multipart/form-data' ? mime.contentType(req.file.originalname) : req.file.mimetype;
    this.uploadByBuffer(req.file.buffer, {
      destination,
      gzip: true,
      validation: 'crc32c',
      metadata: {
        contentType: req.file.mimetype,
        tag: 'test'
      }
    });

    return `https://storage.googleapis.com/${this.bucketId}/${destination}`;
  }

  uploadByBuffer(buffer, options) {
    return Meteor.wrapAsync((buffer, options, cb) => {
      Object.assign({metadata: {}}, options);
      const newFile = this.bucket.file(options.destination);
      newFile.createWriteStream(options).on('error', cb).on('finish', () => cb(null, newFile)).end(buffer);
    }).apply(this, arguments);
  }

  deleteFile(imageUrl) {
    imageUrl = imageUrl.replace(`https://storage.googleapis.com/${this.bucketId}/`, '');
    const deletedFile = this.bucket.file(imageUrl);
    if (deletedFile) {
      deletedFile.delete(err => {
        if (err) {
          console.error(err);
        }
        console.log('delete complte');
      });
    }
  }
}