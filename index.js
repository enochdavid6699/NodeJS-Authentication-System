//Setup Express Server
const express = require('express');
const app = express();
const port = 8000;

//To encrypt the password
const bcrypt = require('bcrypt');

const cookieParser = require('cookie-parser');

//URL Encoder
app.use(express.urlencoded());

app.use(cookieParser());

//Setup Layouts
const expressLayouts = require('express-ejs-layouts');

//Setup DB
const db = require('./config/mongoose');

//Used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportlocal = require('./config/passport-local-strategy');

const passportGoogle = require('./config/passport-google-oauth2-strategy');

const MongoStore = require('connect-mongo');

//SASS
const sassMiddleware = require('node-sass-middleware');

//Flash
const flash = require('connect-flash');
const customMware = require('./config/middleware');

app.use(sassMiddleware(
    {
        src: './assets/scss',
        dest: './assets/css',
        debug: true,
        outputStyle: 'extended',
        prefix: '/css'
    }
));

//Set Static Folder
app.use(express.static('./assets'));

//Here we are using the Layout
app.use(expressLayouts);

//Extract styles and scripts from subpages to the alyout
app.set('layout extractStyles' , true);
app.set('layout extractScripts' , true);

//Setup Ejs
app.set( 'view engine' , 'ejs' );
app.set('views' , './views' );

//Mongo store is used to store the session cookie
app.use(session({
    name:'codeial',
    //TODO - change the secret before deployment
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store: MongoStore.create({
        mongoUrl: "mongodb://127.0.0.1:27017",
        autoRemove: "disabled",
    })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//Flash
app.use(flash());
app.use(customMware.setFlash);

//Setup Express Router
app.use( '/' , require('./routes/index'));

//Check if Server is working
app.listen( port , function(err){
    if(err){
        console.log(`Error in running server: ${err} `);
    }
    console.log(`Server is up and running at Port: ${port} `);
});