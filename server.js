/*---------------------------REQUIREMENTS------------------------------------*/
const port = process.env.PORT || 8080;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
const app = express();


/*---------------------------DATABASE-------------------------------------*/
let password = process.env.MONGO_PASS || require(`${process.env.PWD}/src/mongoPass.js`);
let uri = `mongodb+srv://admin:${password}@cluster0-ihkbm.mongodb.net/test?retryWrites=true&w=majority`;

mongoose.connect(uri, {
  useNewUrlParser: true
});


/*---------------------------MIDDLEWARES-------------------------------------*/
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));


/*---------------------------ROUTES------------------------------------------*/
require(`${process.env.PWD}/routes/routes.js`)(app);


/*---------------------------ERROR-HANDLER-----------------------------------*/
app.use(function(error, req, res, next) {
  res.json({
    message: error.message
  });
});


/*---------------------------SERVER------------------------------------------*/
app.listen(port, () => {
    console.log('Server listening on port: ' + port);
});