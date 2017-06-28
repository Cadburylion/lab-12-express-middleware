# Lab-11 RESTful Ship API with Mongoose

This application creates, reads, updates, and destroys Animal objects. These are stored in the db folder through Mongoose.

## Getting started

The required dependencies:

- body-parser
- dotenv
- express
- mongoose
- cors
- morgan

To start mongoose, in terminal, navigated to the app's directory and type:

- npm start-db (this is a script for: mkdir -p ./db && mongod --dbpath ./db")

## routes

- POST

This route sends POST request to the database to instantiate a Ship object. The body content requires four fields: name, type, captain, cannons. The first three inputs must be strings, and cannons a number.

- GET

This route sends a POST request to the database to find a Ship object with a particular id.

- PUT

This route sends a PUT request to the database to find a Ship object with a particular id and update it.

- DELETE

This route sends a DELETE request to the database to find a Ship object with a particular id and delete it.
