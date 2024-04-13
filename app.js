const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');
const projectRotues = require('./routes/project');


const errorHandle = require('./middleware/error-handling');

const app = express();

//process.env.MONGO_ATLAS_PS
mongoose
    .connect(
        "mongodb+srv://asifmulla166037:" +'3iPCat5n1BFqjCQ3'+ "@cluster0.mxgkxd1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to database!");
    })
    .catch((e) => {
        console.log("Connection failed!" + e);
    });

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
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


app.use('/api/posts', postRoutes);
app.use('/api/project', projectRotues);
app.use('/api/user', userRoutes);

app.all('*', (req, res, next) => {
   // next(new errorHandler(`Can't find ${req.originalUrl} on this server!`, 404));
});

module.exports = app;