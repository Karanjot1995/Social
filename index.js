require("dotenv").config();
const express = require("express");
const envm = require('./config/environment')
const cookieParser = require("cookie-parser");
const port = process.env.PORT;
const app = express();

const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");
//used for session cookie
const session = require("express-session");

const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const passportJWT = require("./config/passport-jwt-strategy");
const passportGoogle = require("./config/passport-google-oauth2-strategy");

const MongoStore = require("connect-mongo")(session);
const sassMiddleware = require("node-sass-middleware");
const flash = require("connect-flash");
const customMware = require("./config/middleware");

//setup chat server to
const chatServer = require('http').Server(app)
// const io = require('socket.io')(chatServer, options);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer)
chatServer.listen(5050)
console.log('Chat server listening on port 5050')
const path = require('path')

// console.log(env.asset_path)


console.log(process.env.CLIENT);

app.use(
  sassMiddleware({
    /* Options */
    src: path.join(__dirname, envm.asset_path, '/scss'),
    dest: path.join(__dirname, envm.asset_path, '/css'),
    debug: true,
    outputStyle: "extended",
    prefix: "/css", // Where prefix is at <link rel="stylesheets" href="prefix/style.css"/>
  })
);

app.use(express.urlencoded());
app.use(cookieParser());

app.use(expressLayouts);
app.use(express.static(envm.asset_path));

//make the uploads path available to the browser at /uploads
app.use("/uploads", express.static(__dirname + "/uploads"));

//extract style and scripts from sub pages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

//mongo store is used to store the  session cookie in the db
app.use(
  session({
    name: "social",
    //todo change the secret befor deployment
    secret: envm.seession_cookie_key,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: new MongoStore(
      {
        mongooseConnection: db,
        autoRemove: "disabled",
      },
      (err) => {
        if (err) {
          console.log(err || "connect mongodb setup ok");
        }
      }
    ),
  })
);

app.use(passport.initialize());

app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

//use express router
app.use("/", require("./routes"));
app.set("view engine", "ejs");
app.set("views", "./views");

app.listen(port, (err) => {
  if (err) {
    console.log(`Error in running the server: ${err}`);
  }
  console.log(
    `app listening on localhostlistening at http://localhost:${port}`
  );
});
