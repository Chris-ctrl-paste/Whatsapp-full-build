// import
import express from 'express'
import mongoose from 'mongoose'
import Messages from './dbMessages.js'
import Pusher from 'pusher'
import Cors from 'cors'



// app config
const app = express();
const port = process.env.PORT || 9000

const pusher = new Pusher({
    appId: '1070132',
    key: '89e4c35f10b186c53638',
    secret: '9b5390b133e380911a59',
    cluster: 'eu',
    useTLS: true
});



// middleware
app.use(express.json())
app.use(Cors())


// db config
const connection_url = "mongodb+srv://chris:ZLzd1OPV52NJl0sW@whatsapp.wrg6p.mongodb.net/<dbname>?retryWrites=true&w=majority"
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,

};

mongoose.connect(connection_url, options)

const db = mongoose.connection
db.once('open', () => {
    console.log("DB connected");

    const msgCollection = db.collection("messagecontents")
    const changeStream = msgCollection.watch()


    changeStream.on('change', (change) => {
        console.log("a change happened")

        if (change.operationType === 'insert') {
            const messageDetails = change.fullDocument;
            pusher.trigger('messages', 'inserted',
                {
                    name: messageDetails.name,
                    message: messageDetails.message,
                    timestamp: messageDetails.timestamp,
                    received: messageDetails.received
                });

        } else {
            console.log('error triggering pusher')
        }
    });
});



// api routes
app.get("/", (req, res) => res.status(200).send("hello world"))

app.get('/api/v1/messages/sync', (req, res) => {
    Messages.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})





app.post("/api/v1/messages/new", (req, res) => {
    const dbMessage = req.body


    Messages.create(dbMessage, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(`new message created: \n ${data}`)
        }
    })

})


// listen
app.listen(port, () => console.log(`Listening on port: ${port}`))