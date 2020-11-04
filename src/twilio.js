const accountSid = 'AC3f9674d42a7ca58ad0a7574bdaeda777';
const authToken = '635fab7f765f69f12639681224723eaf';
const client = require('twilio')(accountSid, authToken);

const sendMessage = (msg, user) => {
    console.log("User: ", user)

    client.messages.create({
        body: msg,
        from: '+18779316371',
        to: user
    }).then(() => console.log("OTP sent"))
        .catch((error) => {
            console.log("Error: ", error)
        })
}

module.exports = sendMessage


