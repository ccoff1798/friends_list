const { Schema, Types } = require('mongoose');

const formatDate = (date) => {
  if (!date) return '';

  let month = '' + (date.getMonth() + 1),
      day = '' + date.getDate(),
      year = date.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [month, day, year].join('/');
};

const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(), 
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: formatDate,
  },
}, {
  toJSON: {
    getters: true,
  },
  toObject: { getters: true },
  _id: false, 
});

module.exports = reactionSchema;
