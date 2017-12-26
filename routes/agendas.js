const router = require('express').Router();
const Agenda = require('../models/agenda.model');
const User = require('../models/user.model');


router.get('/', function(req, res, next) {
    const {
      email
    } = req.dataToken;

    User.findOne({
      email: email
    }, function(err, user) {
      if (err) return next(err);
      res.status(200).json(user.agendas);
    });
  })
  .post('/', function(req, res, next) {
    const {
      name,
      start,
      end,
      duration,
      startEvery,
      link,
      availability,
    } = req.body;

    const {
      email
    } = req.dataToken;

    User.findOne({
      email: email
    }, function(err, user) {
      if (err) return next(err);

      var agenda = new Agenda({
        name,
        start,
        end,
        duration,
        startEvery,
        link,
        availability,
      });

      user.agendas.push(agenda)

      user.save(function(err, user) {
        if (err) return next(err);
        console.log(user)
        return res.status(200).json({
          success: true,
          message: 'Success add agenda to current user',
        });
      })

    });

  })


module.exports = router;
