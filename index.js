const express = require('express');
const bodyParser = require('body-parser');

// Initialize our web app
const app = express();
app.use(bodyParser.json());

// Handle request to the base IP/URL
app.get('/', (req, res) => {
    res.json({ 'Hello': 'world' });
});

app.get('/lengthCounts', (req, res) => {
    let fs = require('fs');
    let obj = {};
    fs.readFile('output/part-00000', 'utf8', function (err, data) {
        if (err) throw err;

        let splitted = data.split("\n");
        for (let i = 0; i < splitted.length; i++) {
            let splitLine = splitted[i].replace(/[() ]/g, '')
            var split = splitLine.split(",");
            var key = split[0];
            var val = split[1];
            obj[key] = val;
        }
        // console.log(obj);
    });

    let fs2 = require('fs');
    fs2.readFile('output/part-00001', 'utf8', function (err, data) {
        if (err) throw err;

        let splitted = data.split("\n");
        for (let i = 0; i < splitted.length; i++) {
            let splitLine = splitted[i].replace(/[() ]/g, '')
            var split = splitLine.split(",");
            var key = split[0];
            var val = split[1];
            obj[key] = val;
        }
        console.log(obj);
        res.send(obj)
    });
});

app.post('/analyze', (req, res) => {
    // res.json({ 'Hello': 'world' });
    res.send("Start Analyzing...")
    // console.log(req.body);
    // res.send(req.body)

    fs = require('fs');
    let jsonContent = JSON.stringify(req.body);
    console.log(jsonContent);

    fs.writeFile("output.json", jsonContent, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }
        console.log("JSON file has been saved.");
    });
});

var http = require('http').Server(app);
const PORT = 80;
http.listen(PORT, function () {
    console.log('Listening');
});