let sequelize = require('sequelize');
let prestart = require('./prestart');
prestart(sequelize);

let express = require('express');
let config = require('config');
let bodyParser = require('body-parser');
let middlewares = require('./middlewares');
let notFoundHandler = require('./middlewares/notFound.js');
let errorHandler = require('./middlewares/error.js');
let app = express();
let Routers = require('./api/routers/index.js');
let xmlParser = require('./middlewares/xmlParser');

app.disable('x-powered-by');
app.set('env', config.util.getEnv('NODE_ENV'));
app.set('port', config.get('server.port'));
app.use(xmlParser);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// Docs
app.use(express.static(__dirname + '/public'));
// Middleware
app.use(middlewares);
// Routers
app.use(Routers);
// Error Handler
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
