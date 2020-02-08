
require('dotenv').config();
const fs = require('fs');
let https = require('https');
let request = require("request");

const month = "february";

async function run() {

    console.log("RUNNING....");

    let url = `https://dallas.hackernest.com/events/dallas-${month}-2020-tech-social/ajax_attendees_list`;

    let options = { method: 'GET',
        url: url,
        headers:
            {
                'cache-control': 'no-cache'
            }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        else {
            console.log(body);
            writeFile(body);
        }
    });

}

async function writeFile (data){
    fs.writeFile(`src/data/${month}.json`, data, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
}

/***************************************************************/

if (require.main === module) {
    run();
}





