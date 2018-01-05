const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const reserveSchema = new Schema({
  agenda: {
    type: Schema.Types.ObjectId,
    ref: 'Agenda',
    required: true
  },
  date: {
    type: String,
    validate: {
      validator: testDate,
      message: '{VALUE} is not a valid'
    },
    required: [true, 'date reservation is required']
  },
  time:{
    type: String,
    validate: {
      validator: testB,
      message: '{VALUE} is not a valid'
    },
    required: [true, 'time reservation is required']
  },
  fullname: {
    type: String,
    required: [true, , 'fullname is required']
  },
  phone: {
    type: String,
    required: [true, , 'phone is required']
  },
  email: {
    type: String,
    required: [true, , 'email is required']
  },
  state: {
    type: String,
    enum: ['none', 'accepted', 'refused'],
    default : 'none'
  }
});

function testDate(val) { // YYYY-MM-DD
  if (typeof val !== 'string') val = '';
  const b = /^([0-9]{4})-([0][1-9]|[1][0-2])-([0-2][0-9]|[3][0-1])$/.test(val);
  const date = new Date(val);
  return (b && date.toString()!='Invalid Date');
}


function testB(v) { // hh:mm am|pm
  return /^([0][0-9]|[1][0-2]):([0-5][0-9]) (pm|am)$/.test(v);
}


module.exports = mongoose.model('Reserve', reserveSchema);
