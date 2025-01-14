// Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/comments', function(req, res) {
  fs.readFile(__dirname + '/comments.json', 'utf8', function(err, data) {
    if (err) {
      console.error(err);
      res.status(500).send('An error occurred: ' + err);
      return;
    }
    res.send(data);
  });
});

app.post('/comments', function(req, res) {
  fs.readFile(__dirname + '/comments.json', 'utf8', function(err, data) {
    if (err) {
      console.error(err);
      res.status(500).send('An error occurred: ' + err);
      return;
    }
    var comments = JSON.parse(data);
    comments.push(req.body);
    fs.writeFile(__dirname + '/comments.json', JSON.stringify(comments, null, 4), function(err) {
      if (err) {
        console.error(err);
        res.status(500).send('An error occurred: ' + err);
        return;
      }
      res.send(comments);
    });
  });
});

app.listen(3000, function() {
  console.log('Server is running on http://localhost:3000');
});
