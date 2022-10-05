var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(bodyParser.json());

var fs = require('fs');


//global variable for tweet data
var tweetinfo = []
//global variable holding recently searched tweets
var searchedtweets = []

//load the input file
fs.readFile('favs.json', 'utf8', function readFileCallback(err,data ){
  if(err){
    req.log.info('cannot load a file:' + fileFolder + '/' + _file_name)
    throw err;
  }
  else{
    tweetinfo = JSON.parse(data);
  }
});
 


//Get functions
//Shows user info
app.get('/tweets', function(req, res) {
  return res.status(200).send({tweetinfo:tweetinfo});

});

//Shows tweet info
app.get('/tweetinfo', function(req, res) {
  return res.status(200).send({tweetinfo:tweetinfo});

});

//Shows searched tweets
app.get('/searchinfo', function(req, res){
  //TODO: send searched tweets
  return res.status(200).send({searchedtweets:searchedtweets});
});

//Post functions
//Posts created tweets
app.post('/tweetinfo', function(req, res) {
  //Creates a random string of numbers abd letters to act a the name 
  var tweetName = String(Math.random().toString(16).substr(2, 8))
  //user given text
  var tweetText = req.body.text;
  //user given id 
	var tweetID = req.body.id;
  //new tweet being created 
	var newTweet = {
    "text": tweetText,
    "id": Number(tweetID),
		"created_at": Date(),
		"user": {
		  "name": tweetName,
      "screen_name": "N/A",
      //random user id number 
      "id": Math.round(Math.random()*100000)
      
		}
	};
  tweetinfo.splice(0, 0, newTweet);

  return res.sendStatus(200);

});

//Posts searched tweets
app.post('/searchinfo', function(req, res) {
   //takes in user given id 
   const id = req.body.id;
   tweetinfo.forEach((tweet) => {
    //checks for a tweet matching with the user given id
    //if found the tweet is put in the searchedtweet array 
     if (tweet.id == id) {
      searchedtweets.splice(0, 0, tweet);
      return res.sendStatus(200);

     }
   });
});


//Update
app.put('/tweets/:nm', function(req, res) {
//takes in users name 
const nm = req.params.nm;
tweetinfo.forEach((tweet) => {
  //checks for a tweet matching with the user given name 
  //if found then the user's screen name is changed to their given screen name input 
  if (tweet.user.name == nm) {
    tweet.user.screen_name = req.body.screen_name;
    return res.status(200).send(tweet);
  }
});


});

//Delete 
app.delete('/tweetinfo/:tweetid', function(req, res) {
  //takes in user given id 
  const id = req.params.tweetid;
  //acts as an index holder for the tweetinfo array 
  var index = 0;
  tweetinfo.forEach(tweet => {
    //checks to see if the user's input matches with a tweet
    //if found the tweet is then deleted 
    if (tweet.id == id) {
      searchedtweets
      return res.status(200).send(tweetinfo.splice(index, 1));
    }
    index++;
  });
});


app.listen(PORT, function() {
  console.log('Server listening on ' + PORT);
});