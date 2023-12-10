var express = require('express');
var app = express();

//import "cors" library
var cors = require('cors');

//usage 1: enable CORS requests for all domains
app.use(cors());

//usage 2: enable CORS requests for a single route
app.get('/product', cors(), (req, res) => {
    //codes go here
})

var corsOptions = {
   origin: 'http://greenwich.edu.vn',
   optionsSuccessStatus: 200
}

//usage 3: enable CORS requests for a single domain
app.get('/product', cors(corsOptions), (req, res) => {
    //codes go here
})