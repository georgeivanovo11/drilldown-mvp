const mongoose = require('mongoose');
const NotFoundError = require('./../errors/not-found-error');

const Segment = mongoose.model('Segment');

class SegmentService {
  getAll() {
    return Segment.find({});
  }

  getOne(id) {
    return Segment.findById(id).then((segment) => {
      if (!segment) {
        throw new NotFoundError('Segment', id);
      }
      return segment;
    });
  }

  create(dto) {
    const segment = new Segment(dto);
    return segment.save();
  }

  update(id, fieldsToUpdate) {
    return Segment.findByIdAndUpdate(
      id, 
      { $set: fieldsToUpdate },
      { new: true },
    ).then((segment) => {
      if (!segment) {
        throw new NotFoundError('Segment', id);
      }
      return segment;
    });
  }

  delete(id) {
    return Segment.deleteOne({ _id: id }).then((status) => {
      if (status.n === 0) {
        throw new NotFoundError('Segment', id);
      }
      return;
    });
  }
}

module.exports = new SegmentService();
