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

You can either use a DaaS (Database as a Service) like mlab.com, or you can setup your own MongoDB locally & on the production server.

```
npm install mongodb --save
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

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
