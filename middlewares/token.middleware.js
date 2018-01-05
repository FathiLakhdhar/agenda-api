const jwt = require('jsonwebtoken');
const privateKey = require('../private.key');

function tokenMiddleware(req, res, next){
  var token = req.headers['authorization'];
  console.log('token : ',token);
  if (token) {
    token= token.split(" ")[1];
    jwt.verify(token, privateKey, function(err, decode) {
      if(err){
        console.log(err);
        return res.status(401).json({
          success: false,
          message: 'error authorization'
        })
      }
      console.log('dataToken : ',decode);
      req.dataToken = decode;
      next();
    })

  } else {
    return res.status(401).json({
      success: false,
      message: 'error authorization'
    })
  }
}

module.exports= tokenMiddleware;
