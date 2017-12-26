const router = require('express').Router();
const Agenda = require('../models/agenda.model');
const User = require('../models/user.model');


router.get('/', function(req, res, next) {
    const {
      email
    } = req.dataToken;

    const {id} = req.query;

    User.findOne({
      email: email
    }, function(err, user) {
      if (err) return next(err);
      if (user){
        if(id) return res.status(200).json(user.agendas.id(id));
        //if id null
        return res.status(200).json(user.agendas);
      }
      else return res.status(401).json({
        success: false,
        message: 'user invalid',
      });
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
        if (user) {
          console.log(user)
          return res.status(200).json({
            success: true,
            message: 'Success add agenda to current user',
            _id: agenda._id
          });
        } else return res.status(401).json({
          success: false,
          message: 'user invalid',
        });

      })

    });

  }) // end POST
  .put('/:id', function(req, res, next) {
    const {
      id
    } = req.params;
    const data = req.body;

    const {
      email
    } = req.dataToken;

    User.findOne({
      email
    }, function(err, user) {
      if (err) return next(err);
      if (user) {
        var agenda = user.agendas.id(id);
        if (agenda) {
          Object.assign(agenda, data);
          user.save(function(err, user) {
            if (err) return next(err);
            return res.status(200).json({
              success: true,
              message: "success update"
            });
          });
        }
        else return res.status(200).json({
          success: false,
          message: "id agenda incorrect"
        });

      } else return res.status(401).json({
        success: false,
        message: 'user invalid',
      });

    });

  }) // end PUT

  .delete('/:id', function(req, res, next) {
    const {
      id
    } = req.params;

    const {
      email
    } = req.dataToken;

    User.findOne({
      email
    }, function(err, user) {
      if (err) return next(err);
      if (user) {
        var agenda = user.agendas.id(id);
        if (agenda) {
          agenda.remove();
          user.save(function(err, user) {
            if (err) return next(err);
            return res.status(200).json({
              success: true,
              message: "success delete"
            });
          });
        }
        else return res.status(200).json({
          success: false,
          message: "id agenda incorrect"
        });

      } else return res.status(401).json({
        success: false,
        message: 'user invalid',
      });

    });

  }) // end DELETE


module.exports = router;
