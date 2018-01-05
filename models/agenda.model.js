const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const intervalSchema = require('./interval.model').schema;

const agendaSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    rel: 'User'
  },
  name: {
    type: String,
    unique: true,
    trim: true
  },
  start: {
    type: String,
    validate: {
      validator: testDate,
      message: '{VALUE} is not a valid'
    },
    required: [true, 'start time is required']
  },
  end: {
    type: String,
    validate: {
      validator: testDate,
      message: '{VALUE} is not a valid'
    },
    required: [true, 'end time is required']
  },
  duration: {
    type: String,
    validate: { // hh:mm
      validator: testA,
      message: '{VALUE} is not a valid'
    },
    required: [true, 'duration is required']
  },
  startEvery: {
    type: String,
    validate: { // hh:mm
      validator: testA,
      message: '{VALUE} is not a valid'
    },
    required: [true, 'event start every is required']
  },
  description: {
    type: String,
  },
  link: {
    type: String,
    unique: true,
    required: [true, 'link is required'],
    set: function(val) {
      return val.trim().replace(/ /g, "-");
    }
  },
  active: {
    type: Boolean,
    default: true
  },
  availability: {
    "0": {
      "active": {
        type: Boolean,
        default: false
      },
      "intervals": [intervalSchema]
    },
    "1": {
      "active": {
        type: Boolean,
        default: false
      },
      "intervals": [intervalSchema]
    },
    "2": {
      "active": {
        type: Boolean,
        default: false
      },
      "intervals": [intervalSchema]
    },
    "3": {
      "active": {
        type: Boolean,
        default: false
      },
      "intervals": [intervalSchema]
    },
    "4": {
      "active": {
        type: Boolean,
        default: false
      },
      "intervals": [intervalSchema]
    },
    "5": {
      "active": {
        type: Boolean,
        default: false
      },
      "intervals": [intervalSchema]
    },
    "6": {
      "active": {
        type: Boolean,
        default: false
      },
      "intervals": [intervalSchema]
    }
  }
});

agendaSchema.statics.findByLink = function(link, callback) {
  return this.find({
    link: link
  }, callback);
};

agendaSchema.pre('validate', function(next) {
  console.log('middleware pre validate');
  if (typeof this.link !== 'string') this.link = '';
  if (this.link.length == 0) this.link = this.name.trim().replace(/ /g, "-");
  next();
});


function testA(v) { // hh:mm
  return /^([0][0-9]|[1][0-2]):([0-5][0-9])$/.test(v);
}

function testDate(val) { // YYYY-MM-DD
  if (typeof val !== 'string') val = '';
  const b = /^([0-9]{4})-([0][1-9]|[1][0-2])-([0-2][0-9]|[3][0-1])$/.test(val);
  const date = new Date(val);
  return (b && date.toString()!='Invalid Date');
}


module.exports = mongoose.model('Agenda', agendaSchema);
