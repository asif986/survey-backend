const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');
const projectRotues = require('./routes/project');
const surveyStoreRoutes = require('./routes/surveyStore');


const errorHandle = require('./middleware/error-handling');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

 app.use(bodyParser.json({ limit: "50mb" }))
 app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))

//process.env.MONGO_ATLAS_PS

mongoose
    .connect(
        "mongodb+srv://asifmulla166037:" +'3iPCat5n1BFqjCQ3'+ "@cluster0.mxgkxd1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", { useUnifiedTopology: true,
        useNewUrlParser: true, useCreateIndex:true})
    .then(() => {
        console.log("Connected to database!");
    })
    .catch((e) => {
        console.log(e);
        console.log("Connection failed!" + e);
    });



app.use("/images", express.static(path.join("backend/images")));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept,Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST,PUT,PATCH, DELETE, OPTIONS"
    );
    next();
});

app.get('/', (req, res) => {
    res.send('API Running');
});

app.use('/api/posts', postRoutes);
app.use('/api/project', projectRotues);
app.use('/api/user', userRoutes);
app.use('/api/surveyStore', surveyStoreRoutes);


app.all('*', (req, res, next) => {
   // next(new errorHandler(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.listen(3000, () => {
    console.log('Server is listenin on PORT AT :' + PORT);
})

module.exports = app;
