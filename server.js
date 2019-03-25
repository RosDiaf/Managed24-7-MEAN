const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();

const jwt = require('jwt-simple');
const moment = require('moment');
const users = require('./users');
const tokens = require('./tokens');

const jwtAttributes = {
    SECRET: 'this_will_be_used_for_hashing_signature',
    ISSUER: 'Rosario Diaferia', 
    HEADER: 'x-jc-token', 
    EXPIRY: 120,
};

// AUTH MIDDLEWARE FOR /token ENDPOINT
const auth = function (req, res) {
    const { EXPIRY, ISSUER, SECRET } = jwtAttributes;
  
    if (req.body) {
      const user = users.validateUser(req.body.name, req.body.password);
      if (user) {
        const expires = moment().add(EXPIRY, 'seconds')
          .valueOf();
        
        const payload = {
          exp: expires,
          iss: ISSUER,
          name: user.name,
          email: user.email, 
        };
  
        const token = jwt.encode(payload, SECRET);
  
        tokens.add(token, payload);
  
        res.json({ token });
      } else {
        res.sendStatus(401);
      }
    } else {
      res.sendStatus(401);
    }
};

// VALIDATE MIDDLEWARE FOR /secretInfo
const validate = function (req, res, next) {
    const { HEADER, SECRET } = jwtAttributes;
  
    const token = req.headers[HEADER];
  
    if (!token) {
      res.statusMessage = 'Unauthorized: Token not found';
      res.sendStatus('401').end();
    } else {
      try {
        const decodedToken = jwt.decode(token, SECRET);
      } catch(e) {
        res.statusMessage = 'Unauthorized: Invalid token';
        res.sendStatus('401');
        return;
      }
      
      if (!tokens.isValid(token)) {
        res.statusMessage = 'Unauthorized : Token is either invalid or expired';
        res.sendStatus('401');
        return;
      }
      next(); 
    }
};
  

// API file for interacting with MongoDB
const api = require('./server/routes/api');

// Enable CORS on ExpressJS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));

// API location
app.use('/api', api);

// Send all other requests to the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/mean/index.html'));
});


/* To secure URL with auth, token and validation */
app.post('/token', auth, (req, res) => {
    res.send('token');
});

app.get('/secretInfo', validate, (req, res) => {
    res.send('Secret info');
});
// -- End


//Set Port
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));