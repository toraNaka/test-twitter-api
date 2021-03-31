require('dotenv').config();

const fs = require("fs");
const { stringify } = require('querystring');
const Twitter = require('twitter');

const client = new Twitter({
    consumer_key: process.env.consumer_key,
    consumer_secret: process.env.consumer_secret,
    access_token_key: process.env.access_token_key,
    access_token_secret: process.env.access_token_secret
});

client.get('search/tweets', { q: '#猫 #マンチカン exclude:retweets',since:'2021-03-31',since_id:'',result_type:'mixed',count:100},(error,tweets,response) =>{
    tweets.statuses.forEach(element => {
        const {id_str:id, user:{id_str: user_id}, created_at, text} = element;
        console.log(id + ',' + user_id + ',' + created_at)
    });
});
