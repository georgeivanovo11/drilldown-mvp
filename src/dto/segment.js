const Joi = require('joi');

const SegmentSchema = Joi.object().keys({
  rusText: Joi.string().max(100).required(),
  engText: Joi.string().max(100).required(),
  rusAudio: Joi.string().allow(null),
  engAudio: Joi.string().allow(null),
});

module.exports = SegmentSchema;
