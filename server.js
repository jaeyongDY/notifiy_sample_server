const express = require('express')
var app = express();

var admin = require('firebase-admin');
var serviceAccount = require('./notifiy-server-firebase-adminsdk-d0eyd-fc201b7d45.json');
var inputData;

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

app.post("/post", (req, res) => {
    console.log("get in here post");

    req.on('data', (data) => {
        inputData = JSON.parse(data);
    })

    req.on('end', () => {
        console.log("token" + inputData.token)
    })
})

var fcm_target_token =

    app.listen(3300, () => {
        console.log('port 3300 server execute!');
    })