const Joi = require('joi');
const multiparty = require('multiparty');
const SegmentService = require('./../services/segment-service');
const BlobService = require('./../services/blob-service');
const SegmentSchema = require('./../dto/segment');
const ValidationError = require('./../errors/validation-error');

const JoiOptions = {
  allowUnknown: true,
  stripUnknown: true,
};

const rusAudioContainer = 'rusaudio';
const engAudioContainer = 'engaudio';

class SegmentController {

  getAll(req, res) {
    return SegmentService.getAll().then((segments) => {
      res.send(segments);
    });
  }

  getOne(req, res) {
    const id = req.params.id;
    return SegmentService.getOne(id).then((segment) => {
      res.send(segment);
    });
  }

  create(req, res) {
    const form = new multiparty.Form();
    let segment = {};

    form.on('field', (name, value) => {
      if (name === 'rusText' || name === 'engText') {
        segment[name] = value;
      }
    });

    form.on('file', (name, file) => {
      if (name === 'rusAudio' || name === 'engAudio') {
        segment[name] = file;
      }
    });

    form.on('close', async () => {
      if (segment.engAudio) {
        segment.engAudio = await BlobService.createBlob(segment.engAudio, engAudioContainer);
      }
      if (segment.rusAudio) {
        segment.rusAudio = await BlobService.createBlob(segment.rusAudio, rusAudioContainer);
      }
      const result = Joi.validate(segment, SegmentSchema, JoiOptions);
      if (result.error) {
        res.status(400).send(result.error.details);
      }
      return SegmentService.create(result.value).then((createdSegment) => {
        res.status(201).send(createdSegment);
      });
    });

    form.on('error', () => {
      res.status(400).json('Request aborted!');
    });

    form.parse(req);
  }

  update(req, res) {
    const id = req.params.id;
    const form = new multiparty.Form();
    let segment = {};

    form.on('field', (name, value) => {
      //if (name === 'rusText' || name === 'engText') {
        segment[name] = value;
      //}
    });

    form.on('file', (name, file) => {
      if (name === 'rusAudio' || name === 'engAudio') {
        segment[name] = file;
      }
    });

    form.on('close', async () => {
      console.log(segment);
      // if (segment.engAudio) {
      //   segment.engAudio = await BlobService.createBlob(segment.engAudio, engAudioContainer);
      // }
      // if (segment.rusAudio) {
      //   segment.rusAudio = await BlobService.createBlob(segment.rusAudio, rusAudioContainer);
      // }
      // const result = Joi.validate(segment, SegmentSchema, JoiOptions);
      // if (result.error) {
      //   res.status(400).send(result.error.details);
      // }
      res.status(202).send(segment);
      // return SegmentService.update(id, result.value).then((updatedSegment) => {
      //   res.status(202).send(updatedSegment);
      // });
    });

    form.on('error', () => {
      res.status(400).json('Request aborted!');
    });

    form.parse(req);
  }

  delete(req, res) {
    const id = req.params.id;
    return SegmentService.delete(id).then(() => {
      res.status(204).send();
    });
  }
}

module.exports = new SegmentController();
