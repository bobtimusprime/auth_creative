var express = require('express');
const fs = require('fs');
const http = require('http');
const request = require('request');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('login.html', {root: 'public'});
});

router.get('/music', function(req, res, next){
  res.sendFile('music.html', {root: 'public'});
});


router.get('/getCountry', function(req,res,next){
var myRe = new RegExp("^" + req.query.q.toLowerCase()); 
fs.readFile(__dirname + '/countries.dat.txt', function(err, data) {
   if(err) throw err;
  var jsonresult = []; 
  var countries = data.toString().split('\n');
   for ( var i =0;  i < countries.length; i++){
    var result = countries[i].toLowerCase().search(myRe);
    if (result != -1){
    // console.log(cities[i]);
     jsonresult.push({country:countries[i]});
    }   
   }
   res.status(200).json(jsonresult);
  }) 
});


router.get('/getTopArtist', function(req, res, next) {
    var country = req.query.q.toLowerCase();
   // console.log(country);
    var lastfmKey = "fa3483fdd647a1652b1b262bc8d90b40";
   // console.log(lastfmKey);
    var myurl = "";
    myurl +=  "http://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=";
   // myurl += "spain";
    myurl += req.query.q.toLowerCase();
    myurl += "&api_key=" + lastfmKey; 
    myurl += "&format=json";
    //console.log(myurl);
   // console.log("in getTopArtist");
    request(myurl).pipe(res);
})

module.exports = router;
