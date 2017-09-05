const express = require('express');
const bodyParser = require('body-parser');
const models = require("./models");
// const path = require("path");
const sessionConfig = require("./sessionConfig");
const mustacheExpress = require('mustache-express');
const expressValidator = require('express-validator');
const session = require('express-session');
// const routes = require('./routes.js');
// const utils = require('./utils.js');
const port = process.env.PORT || 8050;

const app = express();
// app.set('port', (process.env.PORT || 5000));

//VIEW ENGINE
app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

// app.use(express.static(path.join(__dirname, "./public")));
app.use(express.static('./public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
// app.use(routes);

app.use(session(sessionConfig));










// PORT
app.listen(port, () => {
    console.log(`Server is running on port ${port}!`);
});

