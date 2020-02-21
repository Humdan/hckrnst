let request = require("request");

let options = { method: 'GET',
    url: 'https://dallas.hackernest.com/events/dallas-february-2020-tech-social/ajax_attendees_list',
    headers:
        {
            'cache-control': 'no-cache'
        }
};

request(options, function (error, response, body) {
    if (error) throw new Error(error);
    else {
        console.log(body);
    }
});



// App flow *********
// get attendees list -> save to JSON file
// Attendee query: search by email ( create email ending shortcuts)
// if  found -> show color sticker
//  -Mark as checked In
// if !found -> show registration form
//  -Save registration data
//  -Mark CheckedIn
//  -Done -> show color sticker


// Analytics:
// RSVPd attendees
// CheckedIn attendees
// Companies attended
