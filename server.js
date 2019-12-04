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

// force https for production
// code sourced from https://stackoverflow.com/questions/8605720/how-to-force-ssl-https-in-express-js
// shout out to Walter
app.use((req, res, next) => {
    // The 'x-forwarded-proto' check is for Heroku
    if (!req.secure && req.get('x-forwarded-proto') !== 'https' && process.env.NODE_ENV === "production") {
      return res.redirect('https://' + req.get('host') + req.url);
    }
    next();
  })

app.use(morgan('dev'));//lets you test your endpoints in your console

app.use('/', express.static(path.join(__dirname, '/client/build')));

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
