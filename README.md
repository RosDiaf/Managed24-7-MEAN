# Mean

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.6.

## Installing
**Step 1** : Installing Nodejs. You may already have it installed. Visit your console and type:

```
$ node -v
```

**Step 2** : Installing Angular
```
$ npm install @angular/cli -g
```

Once installed, go into the folder where you prefer to store your projects and run the following command:
```
$ ng new mean
$ cd mean
```

Run a command with the Angular CLI that will create a build of our project. We need to do this because our Express server is going to look for a /dist folder to serve the files.
```
$ ng build
```

**Step 3** : Setting up Express.js
```
$ npm install express body-parser --save
```

**Step 4** : Setting up MongoDB

Download, install and start MongoDB

```
"C:\Program Files\MongoDB\Server\3.4\bin\mongod.exe"
```
Generate names

```
Use the following website to generate names:
http://listofrandomnames.com/
```

Create database

```
> use UserDB
> db.users.insertMany( [
      { name: "Louis Farrell", gender: "M" },
      { name: "Lida Harriston", gender: "F" },
      { name: "Shirely Challis", gender: "F" },
      { name: "Alisa Merryman", gender: "F" },
      { name: "Coletta Frieden", gender: "F" },
      { name: "Cassey Rhoades", gender: "M" },
      { name: "Christen Clement", gender: "M" },
      { name: "Otelia Stoudemire", gender: "M" },
      { name: "Renaldo Bernal", gender: "F" },
      { name: "Marissa Ladouceur", gender: "F" },
      { name: "Louis Synder", gender: "M" },
      { name: "Lida Mederos", gender: "F" },
      { name: "Alisa Ison", gender: "F" },
      { name: "Coletta Tibbs", gender: "F" },
      { name: "Cassey Vicks", gender: "M" },
      { name: "Christen Donati", gender: "M" },
      { name: "Otelia Monterrosa", gender: "F" },
      { name: "Renaldo Baugh", gender: "M" },
      { name: "Marissa Horgan", gender: "F" },
      
      ........................................
   ]);

How to get started wit MongoDB
https://medium.freecodecamp.org/learn-mongodb-a4ce205e7739
```

You can either use a DaaS (Database as a Service) like mlab.com, or you can setup your own MongoDB locally & on the production server.

```
npm install mongodb --save
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Web server

Run `node server` for a web server. Navigate to `http://localhost:3000/api/users`. Will provide the list of the users to be cosumed into UI.

## Implementing Token-Based Authentication With jwt-simple

```
npm install jwt-simple
npm install moment
```
### Creating the user store and the token store

```
USERS.JS
TOKENS.JS
```

### Add dependencies and imports our user and token stores

```
const jwt = require('jwt-simple');
const moment = require('moment');
const users = require('./users');
const tokens = require('./tokens');
```

### This object contains the claims that will be used for our token, as well as some other attributes like the app secret and header key.

```
const jwtAttributes = {
    SECRET: 'this_will_be_used_for_hashing_signature',
    ISSUER: 'Rosario Diaferia', 
    HEADER: 'x-jc-token', 
    EXPIRY: 120,
};
```

### Implement middleware for token and validation

```
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
```
### Request token

```
app.post('/token', auth, (req, res) => {
  res.send('token');
});
```

### Validate if a user with the matching password is found 

```
app.get('/secretInfo', validate, (req, res) => {
    res.send('Secret info');
});
```

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## SCREENSHOT

![_screenshot](https://user-images.githubusercontent.com/17438913/54965678-84390300-4f69-11e9-8526-3ad85f05f975.png)
