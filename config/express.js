var express=require('express'),
    config=require('./config'),
    morgan=require('morgan'),
    compress=require('compression'),
    session=require('express-session'),
    bodyParser=require('body-parser'), //used to provide several middleware to handle request data.
    methodOverride=require('method-override'); // Provides Delete and put http verbs legacy support.

module.exports=function(){
  var app=express();
  if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev')); //Simple logger middlwares
  }else if( process.env.NODE_ENV==='production'){
    app.use(compress()); // Compress provides response compression
  }
  app.use(bodyParser.urlencoded({
    extended:true
  }));
  app.use(bodyParser.json());
  app.use(methodOverride());

  app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: config.sessionSecret
  }));

  app.set('views', './app/views');
  app.set('view engine','ejs');
  require('../routes/index-serv-routes/js')(app);
  app.use(express.static('./public'));
  return app;
};
