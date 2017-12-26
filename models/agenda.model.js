const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const intervalSchema = require('./interval.model').schema;

const agendaSchema = new Schema({
  name: {
    type: String,
    unique: true,
    set: (v) => v.trim()
  },
  start: {
    type: String,
    validate: {
      validator: testB,
      message: '{VALUE} is not a valid'
    },
    required: [true, 'start time is required']
  },
  end: {
    type: String,
    validate: {
      validator: testB,
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
      "active": {type: Boolean, default: false},
      "intervals": [intervalSchema]
    },
    "1": {
      "active": {type: Boolean, default: false},
      "intervals": [intervalSchema]
    },
    "2": {
      "active": {type: Boolean, default: false},
      "intervals": [intervalSchema]
    },
    "3": {
      "active": {type: Boolean, default: false},
      "intervals": [intervalSchema]
    },
    "4": {
      "active": {type: Boolean, default: false},
      "intervals": [intervalSchema]
    },
    "5": {
      "active": {type: Boolean, default: false},
      "intervals": [intervalSchema]
    },
    "6": {
      "active": {type: Boolean, default: false},
      "intervals": [intervalSchema]
    }
  }
});

agendaSchema.pre('validate', function(next) {
  console.log('middleware pre validate');
  if (typeof this.link !== 'string') this.link = '';
  if (this.link.length == 0) this.link = this.name.trim().replace(/ /g, "-");
  next();
});


function testA(v) { // hh:mm
  return /^([0][0-9]|[1][0-2]):([0-5][0-9])$/.test(v);
}

function testB(v) { // hh:mm am|pm
  return /^([0][0-9]|[1][0-2]):([0-5][0-9]) (pm|am)$/.test(v);
}

module.exports = mongoose.model('Agenda', agendaSchema);
