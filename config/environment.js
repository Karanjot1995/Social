const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path')


const logDirectory = path.join(__dirname, '../production_logs')
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

const accessLogStream = rfs.createStream('access.log', {
  interval: '1d',
  path: logDirectory
});

const development = {
  name: 'development',
  asset_path: "./assets",
  seession_cookie_key: 'blahsomething',
  db: "codeial_db",
  smtp: {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: 'karanjot.singh1195',
      pass: 'daizykaur1967'
    }
  },
  google_client_id: '1016643530275-jqr2trqv6f0q2ogat19nhf4d8mgo68q6.apps.googleusercontent.com',
  google_client_secret: '2Q5bCV8-JZvN8JHIQ7S4fXjV',
  google_callback_url: "http://localhost:8000/users/auth/google/callback",
  jwt_secret: 'social',
  morgan: {
    mode: 'dev',
    options: { stream: accessLogStream }
  }

}

const production = {
  name: 'production',
  asset_path: "./assets",
  seession_cookie_key: process.env.SOCIAL_SESSION_COOKIE_KEY,
  db: process.env.SOCIAL_DB,
  smtp: {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.SOCIAL_GMAIL_USERNAME,
      pass: process.env.SOCIAL_GMAIL_PASSWORD
    }
  },
  google_client_id: process.env.SOCIAL_GOOGLE_CLIENT_ID,
  google_client_secret: process.env.SOCIAL_GOOGLE_CLIENT_SECRET,
  google_callback_url: "http://social-web.in/users/auth/google/callback",
  jwt_secret: process.env.SOCIAL_JWT_SECRET,
  morgan: {
    mode: 'combined',
    options: { stream: accessLogStream }
  }
}

module.exports = eval(process.env.SOCIAL_ENVIRONMENT) == undefined ? development : eval(process.env.SOCIAL_ENVIRONMENT);
// module.exports = development