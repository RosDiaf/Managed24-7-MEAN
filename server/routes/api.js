const express = require('express');
const router = express.Router();
const employee = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const url = require('url');

const jwt = require('jwt-simple');
const moment = require('moment');
const users = require('../../users');
const tokens = require('../../tokens');

const jwtAttributes = {
    SECRET: 'this_will_be_used_for_hashing_signature',
    ISSUER: 'Rosario Diaferia', 
    HEADER: 'x-jc-token', 
    EXPIRY: 120,
};

/* To secure URL with auth, token and validation */
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
        console.log(token)
  
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
// -- Secure URL End

const connection = (closure) => {
    return MongoClient.connect('mongodb://localhost:27017/usersDB' , { useNewUrlParser: true }, (err, client) => {
        if (err) return console.log(err)
        const db =  client.db('UsersDB')
        closure(db);
    });
};

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

// Get users
router.get('/users', (req, res) => {
    connection((db) => {
        db.collection('users')
            .find()
            .toArray()
            .then((users) => {
                response.data = users;
                res.json(response.data);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

router.get('/users/:id', (req, res) => {
    const userID = req.params.id;
    connection((db) => {
        db.collection('users')
            .findOne({_id: ObjectID(userID)}, function(err, results) {
                if (err){
                  console.log("failed");
                  throw err;
                }
                console.log("success");
                res.json(results)
            });
    });
});

// Get users by term
router.get('/:term', (req, res) => {
    const term = req.params.term;
    connection((db) => {
        db.createIndex({ name: "text", description: "text" })
        db.collection('users')
            .find( { $text: { $search: term } } )
            .toArray()
            .then((users) => {
                response.data = users;
                res.json(response.data);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

router.get('/users/team/employee', (req, res) => {
    connection((db) => {
        db.collection('employee')
            .find()
            .toArray()
            .then((users) => {
                response.data = users;
                res.json(response.data);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

router.post('/users/add', (req, res) => {
    connection((db) => {
        db.collection('users')
            .insertOne(req.body, (err, data) => {
                if(err) {
                    console.log("failed");
                    throw err;
                }
                res.send({message: "Product saved successfully!"} + data);
            })
    });
});

router.delete('/users/remove/:id', (req, res) => {
    const userID = req.params.id;
    connection((db) => {
        db.collection('users')
            .deleteOne({_id: ObjectID(userID)}, function(err, results) {
                if (err){
                  console.log("failed");
                  throw err;
                }
                console.log("success");
                res.send({message: "Product deleted successfully!"});
            });
    });
});


module.exports = router;
// module.exports = employee;
