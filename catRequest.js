var request = require('request');
request(
  'https://latelier.co/data/cats.json',
  function (error, response, body) {
    if (!error && response.statusCode === 200) {
      // to turn into a js object from json
      var parseData = JSON.parse(body);
      console.log(parseData["images"]);
    }
  }
)