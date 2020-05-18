set environment variable
set PORT=5000

// Route Parameter
localhost:3000/api/posts/20003
localhost:3000/api/posts/:id
req.params.id

//Query Parameter
localhost:3000/api/posts/2003?sortBy=name
req.query

// Never trust what clients send over to the server

coding patern should ALWAYS be
if(err) handle
-->continue

//JOI
request Validator Package

// PUT LOGIC

1.  Look up the course
2.  if not existing, return 404- Not Found

3.  Validate
4.  if invalid, return 400- Bad Request

5.  Update course
6.  Return the updated course

// DELETE LOGIC

1.  Look up the course
2.  Not Existing, return 404

3.  Delete

4.  Return the same course

// Middleware
(express.urlencoded()) key=value&key=value x-www-form-urlencoded[postman] --> to parse url encoded form
express.static --> to serve static files
note - public folder are served at the root of our application eg. localhost:3000/readme.txt
morgan --> To log http request

process.env.NODE_ENV --> returns the environment
app.get('env') --> get environment variable

set NODE_ENV=production

// CONFIGURATION
npm i rc
npm config -- Better alternative ---> for using configuration in our node server

// To set password to environment variable
set password=123

// DEBUG [alternative to console.log]
npm i debug
const startupDebugger = require('debug')('app:startup');
startupDebugger('Morgan Enabled...')
---> set DEBUG=app:startupDebugger, app:dbDebugger or app:\* //that means we are only going to see startupDebugger log messages on the console

DEBUG=app:db nodemon server.js

// TEMPLATING ENGINE
1.pug [formerly called jade] npm i pug
2.mustache
3.EJS

app.set('view engine', 'pug');
app.set('views', '') //optional, sets the path to where we store the template default is ./views

//
create new file eg courses.js
const express = require('express')
const router = express.Router();
router.get('/api/courses', (req,res)=>{
res.send('hello')
});
module.exports = router;

server.js
import routes file
const courses = require('/routes/courses)
app.use('/', courses);
