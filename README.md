# Easy Class

## How to run the application

* Pre-requisites: **Node (8+)**, **NPM (6+)**, **MongoDB**. 

* **Do not use *--prefix* to run the following commands**

1. Start MongoDB.
2. Install server dependencies (**within server folder**).

````
# npm install
````

3. Install client dependencies (**within client folder**).

````
# npm install
````

4. Install the main project dependencies and run the client and server applications concurrently with the *local* script (**within project root folder**).

````
# npm install
# npm run local
````

* Run the server tests (**within server folder**):

````
# npm run test
````

* This application is ready for deployment on Heroku. If you wish to do so, just push the project from the root folder to your remote Heroku repository.

====================
## Features

Both client and server applications are using ESLint with airbnb style guides in order to ensure best code standards.

### Express.js server

The web server is implemented using Express.js. It uses the MVC pattern and follows (whenever possible) the architectural practices explained at https://12factor.net. Mongoose is used for mapping MongoDB documents to JavaScript objects and a few end-to-end API tests are demonstrated using Supertest along with Jest.

### React client

Uses React and Redux (an implementation of the Flux pattern) to implement the application's components and their communication. It has a modular Webpack organization (instructions from https://survivejs.com/webpack) neatly separating development and production configurations. The application is responsive, using the Bulma CSS framework (https://bulma.io).
