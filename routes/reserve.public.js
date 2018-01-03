const router = require('express').Router();
const ObjectId = require('mongoose').Types.ObjectId;
var Agenda = require('../models/agenda.model');
var Reserve = require('../models/reserve.model');
var User = require('../models/user.model');

router.post('/:id_agenda', function(req, res, next) {
    const {
      date,
      time,
      fullname,
      phone,
      email
    } = req.body;

    const {id_agenda} = req.params;

    Agenda.findOne({
        _id: id_agenda
      },
      function(err, agenda) {
        if (err) return next(err);
        if (agenda) {
          var reserve = new Reserve({
            agenda,
            date,
            time,
            fullname,
            phone,
            email
          })

          reserve.save(function(err, reserve) {
            if (err) return next(err);
            return res.status(200).json({
              success: true,
              message: "success reservation"
            });
          });
        } else { //agenda null
          return res.status(401).json({
            success: false,
            message: "agenda not found"
          });
        }
      })

  })

module.exports = router;
