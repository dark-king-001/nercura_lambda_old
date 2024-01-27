const express = require('express');
const session = require('express-session');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo');
const env = require('dotenv');
const path = require('path');

env.config()
const port = process.env.PORT || 3000
const database = "nercura_lambda"
const app = express();

app.use(
  session({
    secret: 'your-secret-key',
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 100 * 60 * 60 * 1000, // expires after 100 hours in milliseconds
      secure: false,
    },
    store: MongoStore.create({
      mongoUrl:  process.env.MongoDB_URL || `mongodb://127.0.0.1:27017/${database}?retryWrites=true&w=majority`, // Adjust to your MongoDB connection string
      ttl: 14 * 24 * 60 * 60, // Session TTL in seconds (e.g., 14 days)
    }),
  })
);
app.set('trust proxy', 1);

// Create a write stream for the log file
const fs = require('fs');
const logStream = fs.createWriteStream(path.join(__dirname, 'accessData.csv.log'), { flags: 'a' });
const csvFormat = ':date[iso],:remote-addr,:remote-user,:method,:url,:http-version,:status,:res[content-length],:referrer,:user-agent';
app.use(morgan(csvFormat, { stream: logStream }));

// using views dorectory to load views
app.set('views', path.join(__dirname, 'views'));
// using view engine
app.set('view engine', 'ejs');
// using assets folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// using public folder to load static files
app.use(express.static(path.join(__dirname, 'public')));


// setting up cors and express sessions
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// page routes
const pages = require('./routes/page_routes')
app.use(pages)

// page routes
const admin = require('./routes/Admin_routes')
app.use(admin)

app.get('*', (req,res) => {
  res.render('Error404')
})

mongoose.connect( process.env.MongoDB_URL || `mongodb://127.0.0.1:27017/${database}?retryWrites=true&w=majority`)
.then(console.log(`MongoDB Conneted (${process.env.MongoDB_URL || `mongodb://127.0.0.1:27017/${database}?retryWrites=true&w=majority`})`))
.then(app.listen(port,'127.0.0.1', () => { console.log(`Server Listen On ${port}`)}))
.catch(err => {console.log("An error occured at Mongo Connection\n" + err)})