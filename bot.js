
//Gameplan
// 1. Create a Twitter Account (DONE)
// 2. Run a search for BEst thing I ever ate section (DONE)
// 3. Choose a random tweet from the search result
// 4. Confirm the tweet I selected is not the same tweet
// 5. Post that tweet on my twitter account
// 6. Run the code such that it repeats x number of minutes
// 7. Figure out how to delploye a worker with node.
// 8. Stretch Target--> Do a google image search of phrase and include picture

//=================================

//Connected to twitter
var Twitter = require('twitter');
var fs = require('fs');

//API KEYS
// var client = new Twitter({
//  consumer_key: 'ciUw1kZ6oeQxrN0f2ObflNQMp',
//  consumer_secret: 'GQpD4cv3TjCweiiPdQCG87or1S3FAn0EeUP3KxIThRbKwsYwWB',
//  access_token_key: '950034816174559232-ZTO7JWVgdpctxJtsLdkDfXkRLS5Rzta',
//  access_token_secret: 'P9pzcO8IbJTZbZXtMyz2wpN34ZDzIDP5tHiltZI75nf1N'
// });

var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});


// Tweet Options 
var all_tweets = [];
var historic_tweets = [];
  

var TweetUTSA = function () {
//Run a search for best thing I ever ate
client.get('search/tweets', {q: "UTSA", count: 50}, function(error, tweets, response) {
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
  client.post('statuses/update', {status: "RT:" + selected_tweet.text + "  Tweet Frm:" + selected_tweet.location + ", " + selected_tweet.name + "#BirdsUp"}, function(error, tweet, response) {
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
setInterval(TweetUTSA, 1950000);
