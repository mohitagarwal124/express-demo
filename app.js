process.env.NODE_CONFIG_DIR = 'config/';
var app_instance = process.argv.NODE_APP_INSTANCE;
process.argv.NODE_APP_INSTANCE = "";
config = require('config');
process.argv.NODE_APP_INSTANCE = app_instance;


var express = require('express');
var bodyParser = require('body-parser');
var helmet = require('helmet');
var cors = require('cors');
var app = express();
var users = require('./routes/users');
var http = require('http');
var mysqlLib = require('./routes/mysqlLib');

 app.use(helmet());
 app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.set('port', process.env.PORT || config.get('PORT'));

app.get('/', function(req, res) {
    res.status(200).end();
});

app.post('/register', users.register_user);


var server = http.createServer(app);
server.listen(app.get('port'), "127.0.0.1", function() {
    console.log(server.address())
});;