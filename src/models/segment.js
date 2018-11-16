const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SegmentSchema = new Schema({
  rusText: {
    type: String,
    require: true,
  },
  engText: {
    type: String,
    required: true,
  },
  rusAudio: {
    type: String,
    default: null,
  },
  engAudio: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model('Segment', SegmentSchema);
