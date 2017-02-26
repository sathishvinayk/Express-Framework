process.env.NODE_ENV=process.env.NODE_ENV || 'development';
var express=require('./config/express'),
    app=express();

app.listen(3000,function(){
  console.log('Server running on 3000');
});
module.exports=app;
