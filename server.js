//Import dependencies
var express = require('express');
var bodyParser = require('body-parser');
//Create instances
var app = express();
var router = express.Router();

//Set our port to either a predetermined port number if you have set it up, or 3001
var port = process.env.API_PORT || 3001;


//Configure the API to use bodyParser and look for JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//To prevent errors from Cross Origin Resource Sharing, we will set our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

  //Remove cacheing so we get the most recent topics
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

app.use('/s3', require('react-s3-uploader/s3router')({
    bucket: "global-marriage-equality-tw",
    headers: {'Access-Control-Allow-Origin': '*'}, // optional
    ACL: 'private' // this is default
}));




//Starts the server and listens for requests
app.listen(port, function() {
  console.log(`server running on port ${port}`);
});