const router = require('express').Router();
const mailer = require('../services/mailer.service');
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

  const {
    id_agenda
  } = req.params;

  Agenda.findOne({_id: id_agenda})
  .populate('author', ['email', 'firstname'], User)
  .exec(function(err, agenda) {
      if (err) return next(err);
      if (agenda) {

        Reserve.find({
          agenda: id_agenda,
          state: 'accepted',
          date: date,
          time: time
        }, function(err, reservationsAccepted) {
          if (err) return next(err);
          if(reservationsAccepted.length > 0){
            return res.status(401).json({
              success: false,
              message: 'reservation Invalid *'
            })
          }else{// reservation
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
              let mailOptions = {
                from: email, // sender address
                to: agenda.author.email, // list of receivers
                subject: `Reservation agenda ${agenda.name}`, // Subject line
                text: 'Hello '+agenda.author.firstname, // plain text body
                html: `<b>Hello ${agenda.author.firstname} ${agenda.author.surname}</b>` // html body
              };
              mailer(mailOptions);
              return res.status(200).json({
                success: true,
                message: "success reservation"
              });
            });
          }

        })// end find reservation


      } else { //agenda null
        return res.status(401).json({
          success: false,
          message: "errors reservation"
        });
      }
    })

})

module.exports = router;
