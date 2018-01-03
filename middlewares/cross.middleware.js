function crossMiddleware(req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, authorization, Content-Type, Accept");
  next();
}

module.exports= crossMiddleware;
