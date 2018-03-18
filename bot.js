
//Connected to twitter
var Twitter = require('twitter');
var fs = require('fs');

//API KEYS
var client = new Twitter({
 consumer_key: 'nKsLabEYiOW5HYC65m1eU5Idg',
 consumer_secret: 'd6wCkFaTMv3Ei4IOJQfkict3D0pAaYQg7Zz5PVkC585bNtHSJ8',
 access_token_key: '950034816174559232-SPc79sIX5OemNplvergMtdT2c3O843B',
 access_token_secret: 'wlaZv1LooZX9j8ueGCjcXfzb8dNPN37LZt6edLRP0CJx8'
});

// Tweet Options 
var all_tweets = [];
var historic_tweets = [];


var TweetUTSA = function () {
//Run a search for best thing I ever ate
client.get('search/tweets', {q: "Powerapps", count: 30}, function(error, tweets, response) {
  // console.log(tweets);

  //loop through all tweets possible
  for (tweet in tweets.statuses) {
    //add the tweet to our all_tweets list
    all_tweets.push({
      "text": tweets.statuses[tweet].text,
      "id": tweets.statuses[tweet].id,
      "name": tweets.statuses[tweet].user.name,
      "screen_name": tweets.statuses[tweet].user.screen_name,
      "location": tweets.statuses[tweet].user.location,
      "url": tweets.statuses[tweet].user.url
    });

    //log to console
    console.log(tweets.statuses[tweet].text)

  }

  //============Randomized Tweets ===================================
   //Random Selection of Tweet
   random_element = Math.floor(Math.random() * all_tweets.length) + 1;
  
   // Choose a random tweet 
   selected_tweet = all_tweets[random_element];
   
   if (!(selected_tweet in historic_tweets)){
   //Push the selected tweet to historic tweets
   historic_tweets.push(selected_tweet);
   console.log("THIS IS THE RANDOM TWEET: " + selected_tweet.text);

  //============POST TWEET ===========================================
  //Test case for tweeting out 
  client.post('statuses/update', {status: "RT @" + selected_tweet.screen_name + " " + selected_tweet.text + "  Tweet Frm: " + selected_tweet.location + "GREAT TWEET!!! #OFFICE365"}, function(error, tweet, response) {
    if (!error) {
      console.log(tweet);
    }
    }); 

   }

//==============FS WRITE ================================================

//save twitter objects in JSON
fs.writeFile("contents.json", JSON.stringify(all_tweets, null, '\t'), (err) => {
  if(err) throw err;
  console.log('It\'s saved!');   
});

//save twitter feed to a text file
   fs.writeFile("tweets.json", JSON.stringify(tweets, null, '\t'), (err) => {
    if(err) throw err;
    console.log('It\'s saved!');   
  });

//save historic tweets to a text file
fs.writeFile("historic_tweets.json", JSON.stringify(historic_tweets, null, '\t'), (err) => {
  if(err) throw err;
  console.log('It\'s saved!');   
});


});
}

//Calling Function
TweetUTSA()
setInterval(TweetUTSA, 7200000);