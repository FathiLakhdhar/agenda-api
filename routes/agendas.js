const router = require('express').Router();
const Agenda = require('../models/agenda.model');


router.get('/', function(req, res, next) {
    Agenda.find({},function(err, agendas){
      if(err) return next(err);
      res.status(200).json(agendas);
    })
  })
  .post('/', function(req, res, next) {
    const {
      name,
      start,
      end,
      duration,
      startEvery
    } = req.body;
    var agenda = new Agenda({
      name,
      start,
      end,
      duration,
      startEvery,
    });

    agenda.save(function(err, agenda) {
      if (err) return next(err);
      return res.status(200).json({
        success: true,
        message: 'Success add agenda',
      });
    })
  })


  module.exports = router;
