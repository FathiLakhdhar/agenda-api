const router = require('express').Router();
const Agenda = require('../models/agenda.model');
const User = require('../models/user.model');


router.get('/:id', function(req, res, next) {

  const {
    id
  } = req.params;

  Agenda.findOne({
      _id: id,
      active: true
    },
    function(err, agenda) {
      if (err) return next(err);
      console.log(agenda)
      return res.status(200).json(agenda);
    });

})

module.exports = router;
