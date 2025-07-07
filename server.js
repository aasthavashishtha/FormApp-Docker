const express = require("express");
const app = express();
const path = require("path");
const MongoClient = require("mongodb").MongoClient;     //MongoClient is a class

const PORT = 3030;
app.use(express.urlencoded({extended: true}));  //It tells Express to use middleware that parses form data from the request body( is the part of an HTTP request that carries data sent by the client (usually a browser or frontend) to the server.), converts it into a JavaScript object (req.body), and makes it accessible in route handlers.

app.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname, "index.html")); // __dirname html page is in same directory where server.js is 
});         //jab client "/"route par aayega tab response m index.html file send ki jayegi 

const MONGO_URL = "mongodb://aastha_admin:aastha_password@localhost:27017"; //This defines the MongoDB connection string (URI).
const client = new MongoClient(MONGO_URL);  // create a instance of MongoClient
//The client object is used to connect to the database, access collections, and perform operations like queries, inserts, and updates.

//Get all users
app.get("/getUsers", async(req, res)=>{  //when user sends a get request at /getuser this function will be called to await inside we used async
    await client.connect(URL);              //Connects the MongoClient to the MongoDB database using the provided URL.
    console.log('Connected succesfully to server');

    const db = client.db("my-sample-db");     
    const data = await db.collection('users').find({}).toArray();  //target the users collection find fetch all the documents and toarray converts it into js array and now data holds an array of user objects

    client.close();
    res.send(data);   //Sends the data (array of users) as the HTTP response back to the client (browser, frontend, Postman, etc.).The response will be in JSON format by default.
});

app.post("/addUser", async(req, res)=>{
    const userObj = req.body;           //takes the info from form that is submitted by user
    await client.connect(URL);            //connects the instance to server
    console.log('Connected succesfully to server');   

    const db = client.db("my-sample-db"); //under client we have so my databases so which database to access is written here
    const data = await db.collection('users').insertOne(userObj);  //inside client(mongoconnection(url))-> db(my-sample-db) ->collection(users) -?insertOne the info that has been submitted by post via req we handle ;
    console.log(data);
    console.log('data is inserted in db');
    client.close();
});

app.listen(PORT, ()=>{
    console.log(`server running at port ${PORT}`);
});