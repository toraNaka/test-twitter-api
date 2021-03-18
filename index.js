require('dotenv').config();

const fs = require("fs");
const Twitter = require('twitter');

const client = new Twitter({
    consumer_key: process.env.consumer_key,
    consumer_secret: process.env.consumer_secret,
    access_token_key: process.env.access_token_key,
    access_token_secret: process.env.access_token_secret
});

const main = async () => {
  const stream = await client.stream('statuses/filter', {'track':'#JavaScript, #Java'});

  stream.on('data', data => {
    const {user:{id_str: user_id}, created_at, text} = data;

    console.log(text);

      try {
        fs.appendFile("./userId.csv", user_id + "," + created_at + "\n", (err) => {
            if (err) throw err;
        });
    } catch (error) {
    }
  });
}

main();