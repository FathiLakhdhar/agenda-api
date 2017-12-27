const router = require('express').Router();
const ObjectId = require('mongoose').Types.ObjectId;
var Agenda = require('../models/agenda.model');
var Reserve = require('../models/reserve.model');
var User = require('../models/user.model');

router.get('', function(req, res, next) {
    const {
      id_agenda
    } = req.query;

    const {
      email
    } = req.dataToken;

    User.findOne({
      email
    }, function(err, currentUser) {
      if (err) return next(err);
      if (currentUser) {
        console.log(typeof id_agenda)
        if (currentUser.agendas.indexOf(id_agenda) >= 0) {
          Reserve.find({
            agenda: id_agenda
          }, function(err, reservations) {
            if (err) return next(err);
            return res.json(reservations);
          })
        } else { // id agenda not found
          console.log("id agenda not found");
          return res.json(null);
        }
      } else { //
        console.log("user not currentUser");
        return res.json(null);
      }
    })


  }) //ennd get

  // post
  .post('', function(req, res, next) {
    const {
      id_agenda,
      date,
      time,
      fullname,
      phone,
      email
    } = req.body;


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

  .put('/:id', function(req, res, next) {
    const {
      id
    } = req.params;
    const {
      email
    } = req.dataToken;

    Reserve.findOne({
      _id: id
    }, function(err, reservation) {
      if (err) return next(err);
      if (reservation) {
        User.findOne({
          email: email
        }, function(err, currentUser) {
          if (err) return next(err);
          if (currentUser) {
            if (currentUser.agendas.indexOf(reservation.agenda) >= 0) {
              const {
                state
              } = req.body;
              reservation.state = state;
              reservation.save(function(err, updatedReservation) {
                if (err) return next(err);
                return res.status(200).json({
                  success: true,
                  message: "success update state reservation"
                });
              })

            } else { // id reservation Invalid
              return res.status(401).json({
                success: false,
                message: "id reservation Invalid"
              });
            }
          } else { //currentUser is null
            return res.status(401).json({
              success: false,
              message: "reservation Invalid (current user)"
            });
          }
        })
      } else { // reservation is null
        return res.status(401).json({
          success: false,
          message: "reservation not found"
        });
      }
    })
  })

module.exports = router;
