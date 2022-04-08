const express = require('express');
const bodyParser = require('body-parser');

// Initialize our web app
const app = express();
app.use(bodyParser.json());

let count = 1
let wait = 0
let finished;
let name = "q3-output1";

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
            let split = splitLine.split(",");
            let key = parseInt(split[0]);
            let val = parseInt(split[1]);
            if (!isNaN(key)) {
                obj[key] = val;
            }
        }
        // console.log(obj);
    });

    let fs2 = require('fs');
    fs2.readFile('output/part-00001', 'utf8', function (err, data) {
        if (err) throw err;

        let splitted = data.split("\n");
        for (let i = 0; i < splitted.length; i++) {
            let splitLine = splitted[i].replace(/[() ]/g, '')
            let split = splitLine.split(",");
            let key = parseInt(split[0]);
            let val = parseInt(split[1]);
            if (!isNaN(key)) {
                obj[key] = val;
            }
        }
        console.log(obj);
        res.send(obj)
    });
});

app.post('/analyze', (req, res) => {
    res.send("Start Analyzing...")

    if (count == 2) {
        name = "q3-output2";
    }

    fs = require('fs');
    let jsonContent = JSON.stringify(req.body);
    console.log('\n');
    console.log(jsonContent);


    // Store test case :))
    fs.writeFile("q3_testcase.json", jsonContent, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }
        console.log("JSON file has been saved.");
    });

    const spawn = require("child_process").spawn;

    for (let i = 0; i < 3; i++) {
        if (count == 1) {
            name = "q3-output1";
        }
        else {
            name = "q3-output2";
        }
        name += i;

        console.log("in the for loop successfully");
        console.log(['spark2.py', "input.txt", count.toString(), i.toString(), name]);

        const pythonProcess = spawn('python3', ['spark2.py', "input.txt", count.toString(), i.toString(), name]);
        pythonProcess.stdout.on('data', function (data) {
            res = data.toString();
            console.log(res)
            if (res == 'True') {
                finished = true;
                console.log("everything seems good so far...")
            }
            else {
                finished = false;
                console.log("looks good...")
            }
        });
    }
    count += 1
});

app.get('/result', (req, res) => {

    function sleep(millis) {
        return new Promise(resolve => setTimeout(resolve, millis));
    }

    function sleeping() {
        sleep(6000).then(() => {
            wait += 1
            console.log("Not done yet");
            console.log("five second has elapsed");
            res.send('Not done yet');
        });
    }




    // let obj = {};
    // let fs2 = require('fs');
    // fs2.readFile('hw3-res-10.txt', 'utf8', function (err, data) {
    //     if (err) throw err;

    //     let splitted = data.split("\n");
    //     length = splitted.length;

    //     let i = 0;
    //     let maxs = -1;
    //     let idx = 0;
    //     while (i < length) {
    //         if (splitted[i] > maxs) {
    //             maxs = parseInt(splitted[i]);
    //             idx = i;
    //         }
    //         i += 3;
    //     }
    //     let key = splitted[idx + 1];
    //     let sentence = splitted[idx + 2];
    //     console.log(key);
    //     console.log(sentence);
    //     obj[key] = sentence;
    //     console.log(obj);
    // });

    // let fs3 = require('fs');
    // fs3.readFile('hw3-res-11.txt', 'utf8', function (err, data) {
    //     if (err) throw err;

    //     let splitted = data.split("\n");
    //     length = splitted.length;

    //     let i = 0;
    //     let maxs = -1;
    //     let idx = 0;
    //     while (i < length) {
    //         if (splitted[i] > maxs) {
    //             maxs = parseInt(splitted[i]);
    //             idx = i;
    //         }
    //         i += 3;
    //     }
    //     let key = splitted[idx + 1];
    //     let sentence = splitted[idx + 2];
    //     console.log(key);
    //     console.log(sentence);
    //     obj[key] = sentence;
    //     console.log(obj);
    // });

    // let fs4 = require('fs');
    // fs4.readFile('hw3-res-12.txt', 'utf8', function (err, data) {
    //     if (err) throw err;

    //     let splitted = data.split("\n");
    //     length = splitted.length;

    //     let i = 0;
    //     let maxs = -1;
    //     let idx = 0;
    //     while (i < length) {
    //         if (splitted[i] > maxs) {
    //             maxs = parseInt(splitted[i]);
    //             idx = i;
    //         }
    //         i += 3;
    //     }
    //     let key = splitted[idx + 1];
    //     let sentence = splitted[idx + 2];
    //     console.log(key);
    //     console.log(sentence);
    //     obj[key] = sentence;
    //     console.log(obj)
    //     res.send(obj);
    // });


    if (wait <= 3 && count == 2) {
        sleeping();
        // wait += 1
        // console.log("Not done yet");
        // res.send('Not done yet');
    }
    if (3 <= wait <= 6 && count == 3) {
        sleeping();
        // wait += 1
        // console.log("Not done yet");
        // res.send('Not done yet');
    }

    if (3 <= wait && count == 2) {
        let obj = {};
        let fs2 = require('fs');

        function sleeping2() {
            sleep(2000).then(() => {
                console.log(obj);
                res.send(obj);
            });
        }
        fs2.readFile('hw3-res-10.txt', 'utf8', function (err, data) {
            if (err) throw err;

            let splitted = data.split("\n");
            length = splitted.length;

            let i = 0;
            let maxs = -1;
            let idx = 0;
            while (i < length) {
                if (splitted[i] > maxs) {
                    maxs = parseInt(splitted[i]);
                    idx = i;
                }
                i += 3;
            }
            let key = splitted[idx + 1];
            let sentence = splitted[idx + 2];
            obj[key] = sentence;
            // console.log(obj);
        });

        let fs3 = require('fs');
        fs3.readFile('hw3-res-11.txt', 'utf8', function (err, data) {
            if (err) throw err;

            let splitted = data.split("\n");
            length = splitted.length;

            let i = 0;
            let maxs = -1;
            let idx = 0;
            while (i < length) {
                if (splitted[i] > maxs) {
                    maxs = parseInt(splitted[i]);
                    idx = i;
                }
                i += 3;
            }
            let key = splitted[idx + 1];
            let sentence = splitted[idx + 2];
            obj[key] = sentence;
            // console.log(obj);
        });

        let fs4 = require('fs');
        fs4.readFile('hw3-res-12.txt', 'utf8', function (err, data) {
            if (err) throw err;

            let splitted = data.split("\n");
            length = splitted.length;

            let i = 0;
            let maxs = -1;
            let idx = 0;
            while (i < length) {
                if (splitted[i] > maxs) {
                    maxs = parseInt(splitted[i]);
                    idx = i;
                }
                i += 3;
            }
            let key = splitted[idx + 1];
            let sentence = splitted[idx + 2];
            obj[key] = sentence;
            // console.log(obj);
            // console.log(obj);
            sleeping2();
            // res.send(obj);
        });
    }
    else if (6 <= wait && count == 3) {
        let obj = {};
        let fs6 = require('fs');

        fs6.readFile('hw3-res-20.txt', 'utf8', function (err, data) {
            if (err) throw err;

            let splitted = data.split("\n");
            length = splitted.length;

            let i = 0;
            let maxs = -1;
            let idx = 0;
            while (i < length) {
                if (splitted[i] > maxs) {
                    maxs = parseInt(splitted[i]);
                    idx = i;
                }
                i += 3;
            }
            let key = splitted[idx + 1];
            let sentence = splitted[idx + 2];
            obj[key] = sentence;
            // console.log(obj);
        });

        let fs7 = require('fs');
        fs7.readFile('hw3-res-21.txt', 'utf8', function (err, data) {
            if (err) throw err;

            let splitted = data.split("\n");
            length = splitted.length;

            let i = 0;
            let maxs = -1;
            let idx = 0;
            while (i < length) {
                if (splitted[i] > maxs) {
                    maxs = parseInt(splitted[i]);
                    idx = i;
                }
                i += 3;
            }
            let key = splitted[idx + 1];
            let sentence = splitted[idx + 2];
            obj[key] = sentence;
            // console.log(obj);
        });

        let fs8 = require('fs');
        fs8.readFile('hw3-res-22.txt', 'utf8', function (err, data) {
            if (err) throw err;

            let splitted = data.split("\n");
            length = splitted.length;

            let i = 0;
            let maxs = -1;
            let idx = 0;
            while (i < length) {
                if (splitted[i] > maxs) {
                    maxs = parseInt(splitted[i]);
                    idx = i;
                }
                i += 3;
            }
            let key = splitted[idx + 1];
            let sentence = splitted[idx + 2];
            obj[key] = sentence;
            // console.log(obj);
            console.log(obj);
            res.send(obj);
        });
    }

    // if (5 <= wait && count == 1) {
    //     let fs = require('fs');
    //     let path = "./hw3-res-12.txt"
    //     let obj = {};

    //     if (fs.existsSync(path)) {
    //         fs.readFile('hw3-res-10.txt', 'utf8', function (err, data) {
    //             if (err) throw err;
    //             let splitted = data.split("\n");
    //             obj['becoming'] = splitted[1];
    //         });

    //         fs.readFile('hw3-res-11.txt', 'utf8', function (err, data) {
    //             if (err) throw err;
    //             let splitted = data.split("\n");
    //             obj['decided'] = splitted[1];
    //         });

    //         fs.readFile('hw3-res-12.txt', 'utf8', function (err, data) {
    //             if (err) throw err;
    //             let splitted = data.split("\n");
    //             obj['always'] = splitted[1];
    //         });
    //         console.log(obj);
    //         res.send(obj);
    //     }
    //     // else {
    //     //     console.log("Not done yet");
    //     //     res.send('Not done yet');
    //     // }
    // }
    // else if (10 <= wait && count == 2) {
    //     let fs = require('fs');
    //     let path = "./hw3-res-22.txt"
    //     let obj = {};

    //     if (fs.existsSync(path)) {
    //         fs.readFile('hw3-res-20.txt', 'utf8', function (err, data) {
    //             if (err) throw err;
    //             let splitted = data.split("\n");
    //             obj['always'] = splitted[1];
    //         });

    //         fs.readFile('hw3-res-21.txt', 'utf8', function (err, data) {
    //             if (err) throw err;
    //             let splitted = data.split("\n");
    //             obj['family'] = splitted[3];
    //         });

    //         fs.readFile('hw3-res-22.txt', 'utf8', function (err, data) {
    //             if (err) throw err;
    //             let splitted = data.split("\n");
    //             obj['been'] = splitted[1];
    //         });
    //         console.log(obj);
    //         res.send(obj);
    //     }
    //     // else {
    //     //     res.send('Not done yet');
    //     // }
    // }
});

var http = require('http').Server(app);
const PORT = 80;
http.listen(PORT, function () {
    console.log('Listening');
});