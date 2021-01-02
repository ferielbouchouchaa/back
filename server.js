const express = require("express");
const http = require('http');
const cors = require('cors');
const mongo =require('mongoose');

const Partie = require('./Models/Partie')
const app=express();
const port = 3000;
app.use(express.json());
app.use(cors());

const server = http.createServer(app);
const io = require('socket.io')(server);
var messages=[];
server.listen(process.env.PORT||3000,() =>console.log("server running on port 3000"));
// connect to socket 
io.on("connection", (client)=>{
    console.log("new user connected");
    
    //  client.on('message',msg =>{
    //     console.log(msg);
    //         io.emit('message',msj);

        
    //  });
})  ;

 app.get('/messages/index', (req, res) => {
    Partie.find({ 'userCreate.id': 1 }, 'messages').then(result =>{
        res.json(result);
        console.log(result);
    })
 })

app.get('/', (req, res) => {
    res.json('API')
})

app.post('/messages/create', (req, res) => {
    const { message, name } = req.body;
    
    const partie = new Partie({

    });
   const msj={user_sent:1,value:message}
    Partie.updateOne({'name':name},{$push:{messages:msj}}).then(()=>{
        io.emit('message',{value:message});
    })
    console.log(msj)
    res.send('ok');
})

app.get("/partie",(req,res)=>{
    Partie.find({ 'userCreate.id': 1 }, 'userCreate name users').then(result =>{
        res.json(result);
        console.log(result)
    });
})



// connect to mongodb
 url='mongodb+srv://test:test@cluster0.apyv5.mongodb.net/test?retryWrites=true&w=majority'
 const connectionParams={
    useNewUrlParser: true,
   useCreateIndex: true,
   useUnifiedTopology: true 
 }
  mongo.connect(url,connectionParams)
    .then( (client) => {
        console.log('Connected to database ')
    })
     .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);

    
    
   })
