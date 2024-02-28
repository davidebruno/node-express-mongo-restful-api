# RESTFul API Sample project

Sample REST API that performs CRUD operations, it is implemented in Typescript using Node.js, Express and MongoDB.

## Prerequisites
- Node.js 10+
- MongoDB

-  create the following user on MongoDB

    db.createUser({ user: "userapp", pwd: "passvalue", roles: [{ role: "dbAdmin", db: "company" }, { role: "readWrite", db: "company" } ]})

- Yarn or Npm

## Installation
- Install dependencies
```bash
npm install
```
- Rename the local environment variables fie
```shell

 from env to .env
```
- Start Application
```bash
npm start
```
The application will be launched by [Nodemon](https://nodemon.com) so it's will restart automatically on file change
