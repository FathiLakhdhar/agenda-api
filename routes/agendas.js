const router = require('express').Router();
const Agenda = require('../models/agenda.model');
const User = require('../models/user.model');


router.get('/', function(req, res, next) {
    const {
      email
    } = req.dataToken;

    const {
      id
    } = req.query;


    User.findOne({
      email: email
    }, function(err, user) {
      if (err) return next(err);
      if (user) {

        var selector = {
          author: user.id
        };
        if (id) selector._id = id;
        Agenda.find(selector,
          function(err, agendas) {
            if (err) return next(err);
            console.log(agendas)
            if(id){
              return res.status(200).json(
                agendas[0]?agendas[0]: null
              );
            }else{
              return res.status(200).json(agendas);
            }

          });

      } else return res.status(401).json({
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
      if (!user) return res.status(401).json({
        success: false,
        message: 'user invalid',
      });

      var agenda = new Agenda({
        author: user._id,
        name,
        start,
        end,
        duration,
        startEvery,
        link,
        availability,
      });

      agenda.save(function(err, agenda) {
        if (err) return next(err);
        console.log(agenda);
        user.agendas.push(agenda._id);
        user.save(function(err, user){
          if(err) return next(err);
          return res.status(200).json({
            success: true,
            message: 'Success add agenda to current user',
            _id: agenda._id
          });
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
        Agenda.findOne({
          _id: id
        }, function(err, agenda) {
          if (err) return next(err);
          if (agenda) {
            Object.assign(agenda, data);

            agenda.save(function(err, updatedAgenda) {
              if (err) return next(err);
              return res.status(200).json({
                success: true,
                message: "success update"
              });
            });

          } else return res.status(200).json({
            success: false,
            message: "agenda not found"
          });

        })


      } else return res.status(401).json({
        success: false,
        message: 'user not found',
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
        user.agendas.remove(id);
        Agenda.remove({
          _id: id,
          author: user._id
        }, function(err) {
          if (err) return next(err);
          user.save(function(err, user){
            if(err) return next(err);
            return res.status(200).json({
              success: true,
              message: "success delete"
            });
          })
        })

      } else return res.status(401).json({
        success: false,
        message: 'user invalid',
      });

    });

  }) // end DELETE


module.exports = router;
