const express = require('express');
const app = express();
var request = require('request');
console.log(request);

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/index.html");
})

app.get('/items', function (req, res) {
    // res.status(200).send('Not found');
    // return;
    request.get('https://fetch-hiring.s3.amazonaws.com/hiring.json', function(err, response, body) {
        if (!err && response.statusCode == 200) {
            // var locals = JSON.parse(body);
            res.setHeader('Content-Type', 'application/json');
            res.send(body);
        }
        else{
            res.send("Sorry kid");
        }
    })
});
 
app.listen(3000);