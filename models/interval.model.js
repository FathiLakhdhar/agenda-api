const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const intervalSchema = new Schema({
  from:{
    type: String,
    validate: {
      validator: testB,
      message: '{VALUE} is not a valid'
    },
    required: true
  },
  to:{
    type: String,
    validate: {
      validator: testB,
      message: '{VALUE} is not a valid'
    },
    required: true
  },
  active:{
    type: Boolean,
    default: true
  }
});

function testB(v) { // hh:mm am|pm
  return /^([0][0-9]|[1][0-2]):([0-5][0-9]) (pm|am)$/.test(v);
}


module.exports= mongoose.model('Interval', intervalSchema);
