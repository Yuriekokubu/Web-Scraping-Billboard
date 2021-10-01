const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const app = express();
const cors = require('cors');

app.get('/', cors(), (req, res) => {
  let rank = req.query.rank;
  let url = `https://www.billboard.com/charts/hot-100`;

  request(url, (err, response, html) => {
    if (!err) {
      var $ = cheerio.load(html);

      var base =
        'ol.chart-list__elements li:nth-child(' +
        rank +
        ') > button > span.chart-element__information > ';

      var title = $(base + '.chart-element__information__song').text();
      var artist = $(base + '.chart-element__information__artist').text();
      var obj = {
        title: title,
        artist: artist,
        rank: rank,
      };

      res.send(obj);
    }
  });
});

app.listen(8080, () => console.log('API IS running on http://localhost:8080'));
module.exports = app;
