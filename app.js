// // const bodyParser = require("body-parser");
// // const express = require("express");
// // const request = require("request");
// // const http = require("https");

// // const app = express();

// // app.use(express.static("public"));
// // app.use(bodyParser.urlencoded({ extended: true }));


// // app.get("/", function (req, res) {
// //     res.sendFile(__dirname + "/signup.html");
// // });

// // app.post("/", function (req, res) {
// //     var firstName = req.body.fName;
// //     var lastName = req.body.lName;
// //     var email = req.body.email;
// //     // console.log(firstName, lastName, email);
// //     var data = {
// //         members: [
// //             {
// //                 email_address: email,
// //                 status: "subscribed",
// //                 merge_fields: {
// //                     FNAME: firstName,
// //                     LNAME: lastName,
// //                 }
// //             }
// //         ]
// //     };

// //     var jsonData = JSON.stringify(data);

// //     var options = {
// //         url: "https://us1.api.mailchimp.com/3.0/lists/5b968d8182",
// //         method: "POST",
// //         header: {
// //             "Authorization": "suchitra 5c7ecf104029cb5fa7c3f13a0c6e5d4b-us1"
// //         },
// //         body: jsonData
// //     };

// //     request(options, function (error, response, body) {
// //         if (error) {
// //             console.log(error);
// //         } else {
// //             console.log(response.statusCode);
// //         }
// //     })

// // });

// // app.listen(3000, function () {
// //     console.log("Server is running on port 3000.");
// // });



// // //api key
// // // 5c7ecf104029cb5fa7c3f13a0c6e5d4b-us1
// // //list id
// // // 5b968d8182


// //use other's code

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

//to use static files such as images and stylesheets to express

app.use(express.static("public"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;
    //creating data object to be posted to mailchimp
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName,
                }
            }
        ]
    }
    const jsonData = JSON.stringify(data);
    //mailchimp list id
    const list_id = "5b968d8182";
    //mailchimp API url
    const url = "https://us1.api.mailchimp.com/3.0/lists/" + list_id;
    //options for https.request
    const options = {
        method: "POST",
        auth: "suchi:5c7ecf104029cb5fa7c3f13a0c6e5d4b-us1"                       //username can be anything like jay29 and password is api key of mailchimp
    }

    const request = https.request(url, options, function (response) {
        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
            //res.send("Successful");
        }
        else {
            res.sendFile(__dirname + "/failure.html");
            //res.send("failed");
        }
        console.log(response.statusCode);
    });
    //writing data entered by user to request given to mailchimp
    request.write(jsonData);
    //to say that we have done
    request.end();
});

app.post("/failure", function (req, res) {
    res.redirect("/");
});


//API KEY
//cb75005bb15481d62ebbb04f2a940459-us18




//list id
// dd3f793398

//{"name":"Freddie'\''s Favorite Hats","contact":{"company":"Mailchimp","address1":"675 Ponce De Leon Ave NE","address2":"Suite 5000","city":"Atlanta","state":"GA","zip":"30308","country":"US","phone":""},"permission_reminder":"You'\''re receiving this email because you signed up for updates about Freddie'\''s newest hats.","campaign_defaults":{"from_name":"Freddie","from_email":"freddie@freddiehats.com","subject":"","language":"en"},"email_type_option":true}


app.listen(process.env.PORT || 3000, function () {
    console.log("Server Started");
});

