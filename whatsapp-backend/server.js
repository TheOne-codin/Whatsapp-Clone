//importing
import express from "express";
import mongoose from "mongoose";
import Messages from "./dbMessages.js"
import Pusher from "pusher"
import cors from 'cors'

//app config
const app=express()
const port = process.env.PORT || 9000

const pusher = new Pusher({
    appId: "1151007",
    key: "f32ef55f16b0f5d529de",
    secret: "01909afd4f5e93a60861",
    cluster: "ap2",
    useTLS: true
  });

//middleware
app.use(express.json());
app.use(cors())

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", '*')
    res.setHeader("Access-Control-Allow-Origin", '*')
    next();
})

//Db config pXVm7WhGHx27xg6
const connection_url = 
"mongodb+srv://hiddenusername:hiddenforareason@cluster0.5xbwp.mongodb.net/Wdb?retryWrites=true&w=majority"

mongoose.connect(connection_url,{
    useCreateIndex: true,
    useNewUrlParser:true,
    useUnifiedTopology:true
});

const db = mongoose.connection

db.once('open', () => {
    console.log('db is connected')

    const msgCollection = db.collection('messagecontents')
    const changeStream = msgCollection.watch()

    changeStream.on('change', (change) => {
        console.log(change);

        if(change.operationType === 'insert'){
            const messageDetails = change.fullDocument;
            pusher.trigger('message', 'inserted', 
            {
                name: messageDetails.name,
                message: messageDetails.message,
                received: messageDetails.received
            }
            );
        }else {
            console.log('Error Triggering Pusher')
        }
    })
})



//???

//api routes
app.get('/', (req,res)=> res.status(200).send('hello world'));

app.get('/messages/sync', (req, res) => {
    // eslint-disable-next-line array-callback-return
    Messages.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else{
            res.status(200).send(data)
        }
    })
})

app.post('/messages/new', (req, res) => {
    const dbMessage= req.body;

    Messages.create(dbMessage, (err, data) => {
        if(err){
            res.status(500).send(err)
        }else{
            res.status(201).send(`new message created: \n ${data}`)
        }
    });
});

//listen
app.listen(port, ()=> console.log("Server is running at port:"+ port ));
