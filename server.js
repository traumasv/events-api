const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const errorHandler = require('errorhandler');
require('./db.js');
require('./models/users.js');
require('./config/passport.js');

//Configure mongoose's promise to global promise
mongoose.promise = global.Promise;

const app = express();

//Configure app
//have a routes middleware (refers to index.js)
app.use(require('./routes'));
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

//initializing passport
app.use(passport.initialize());
app.use(passport.session());

if(process.env.NODE_ENV !== 'PRODUCTION'){
    app.use(errorHandler());

    app.use((err, req, res) => {
      res.status(err.status || 500);
  
      res.json({
        errors: {
          message: err.message,
          error: err,
        },
      });
    });

}

app.use((err, req, res) => {
  res.status(err.status || 500);

  res.json({
    errors: {
      message: err.message,
      error: {},
    },
  });
});

app.listen(process.env.port || 3000, function(){
    console.log('server started');
});