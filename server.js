var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var config = require('./config'); 
var serveFavicon = require('serve-favicon');
var app = express();
var api = require('./routes/controller')(app,express);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(serveFavicon(__dirname + '/public/favicon.ico'));
//app.use('/api', api);

var server = app.listen(3000,function(err){
    if(err){
        console.log(err);
    }else{
        console.log('express server running at '+config.port);
    }
});
