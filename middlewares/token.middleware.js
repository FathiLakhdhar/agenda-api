const jwt = require('jsonwebtoken');
const privateKey = require('../private.key');

function tokenMiddleware(req, res, next){
  const token = req.headers['authorization'];
  console.log('token : ',token);
  if (token) {
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
