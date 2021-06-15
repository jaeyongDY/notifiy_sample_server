const express = require('express')
var app = express();

var admin = require('firebase-admin');
var serviceAccount = require('./notification-94829-firebase-adminsdk-97tyl-75581dd90c.json');
var inputData;

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});


app.post("/post", (req, res) => {
    console.log("get in here post");

    req.on('data', async(data) => {
        inputData = await JSON.parse(data);
    })

    req.on('end', () => {
        console.log(inputData.token)
        var registrationToken = inputData.token;
        var message = {
            notification: {
                title: '침입을 감지 하였습니다.',
                body: '침입 감지 영상을 확인하시길 바랍니다.',
            },
            data: {
                fileno: '44',
                style: 'good'
            },
            token: registrationToken
        };

        // Send a message to the device corresponding to the provided
        // registration token.
        admin.messaging().send(message)
            .then((response) => {
                // Response is a message ID string.
                console.log('Successfully sent message:', response);
            })
            .catch((error) => {
                console.log('Error sending message:', error);
            });
    })
    res.write("ok");
    res.end();
})


app.listen(3300, () => {
    console.log('port 3300 server execute!');
})