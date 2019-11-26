require('dotenv').config(); //.env to keep variables private
const express = require('express'); //node web framework
const morgan = require('morgan'); //to check api endpoints
const path = require('path');//node module which lets us access file system
const mongoose = require('mongoose');//mongo odm 

const app = express();
const uri = process.env.ATLAS_URI;
const port = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));//url encoding parsing middleware
app.use(express.json());//json parsing middleware

app.use(morgan('dev'));//lets you test your endpoints in your console

//serves up static sites when in production environment
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}
// connection to database
mongoose.connect(uri, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  });
  const connection = mongoose.connection;
  connection.once('open', () => {
    console.log("MongoDB connection is live");
})

//connects api routes
const apiRoutes = require('./routes/apiRoutes');
app.use('/api', apiRoutes);

//sends files to the react app
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

//console logs when server is up and running
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
