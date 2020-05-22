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

// USING MONGOOSE
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
.then(() => console.log('Connected to mongoDB...'))
.catch(err => console.error('could not connect to MongoDB...', err));

//SCHEMA TYPES

String
Number
Date
Buffer
Boolean
ObjectID
Array

// Classes[Blueprint], Objects --->OOP
// Course, nodeCourse

Schema --> Model[Blueprint/Class] --> Document
mongoose.Schema() --> mongoose.model('model', schema)

lowwer case for objects
Camelcase for Classes

document.save() eg. course.save();

// ASYNC OPERATION

1.  File System
2.  Network Requests

await code must be inside a function eg
async save(){
await course.save();
}

// COMPARISON OPERATORS

// eq (equal)
// ne (not equal)
// gt (greater than)
// gte (greater than or equal to)
// lt ( less than)
// lte (less than or equal to )
// in
// nin (not in)
// ,[comma](and) ---> for properties
// $in:[0,3,5](or) 0 or 3 or 5 ---> for values
// seach a preperty ---> create a new object and use the operator as key {$gte:10}

// LOGICAL OPERATORS

// or ---> for objects
or([{}, {},{}]) eg or([{author:'Mosh}, {isPublished:true}])
// and ---> for objects
and([{}, {},{}]) eg and([{author:'Mosh}, {isPublished:true}])

// REGEX OPERATOR
find:{author: /pattern/}
//startsWith /^/ eg /^Mosh/
//endsWith /$/ eg /Hameddani$/
case insenseitive / /i

// Starts with Mosh
.find({author:/^Mosh/})

// Ends with Hmaeddani
.find({author: /Hamedanni$/i}) i means case insensitive

// Contains Mosh
.find({author:/._Mosh._/})

// COUNT
.count()

// Query Operator
// /api/courses?pageNumber=2&pageSize=10

// FORMULA FOR PAGINATION
const pageNumber = 2;
const pageSize = 10;
.skip((pageNumber - 1) \* pageSize)
limit(pagesize)

mongoimport ---> to import data into our database

// UPDATING A DOCUMENT

1.  Query First ---> findById() -> modify its properties ->save()

    async function updateCourse(id) {
    const course = await Course.findById(id);
    if (!course) return;

course.isPublished = true;
course.author = 'Another Author';

course.set({
isPublished: true,
author: 'Another Author'
});
course.save();
}

2.  Update First ---> Update directly ->(optionally) get the updated document

// UPDATE OPERATORS
$inc
$currentDate
$max

await Course.update({ \_id: id }, {
$set: {
author: 'Mosh',

update (returns the result of the operation) ---> $set
findByIdAndUpdate(returns the document that was updated)
await Course.deleteOne({ \_id: id }); (returns the result of the operation)
await Course.deletemany({ \_id: id }); (returns the result of the operation)
findByIdAndDelete(returns the document that was deleted)

course.validate(); returns Promise of void
so we pass a callback to check for isValid
course.validate((err)=>{
if(err){

}
});

Joi validation in our restful apis to make sure data our client is sending us is valid,
mongoose validation to make sure data sent to the dB is in the right shape

Note
()=>{} arrow functions dont have this in their own context // means anonymous function have global scope. this refers to higher level object

Note
validation only existss in the context on mongoose. mongodB doensnt care

// enum validator
enum:['yellow','red','blue']

// Custom validator
validate: {
validator: function (value) {
return value && value.length > 0;
},
message: 'A course should have at least one tag.'
}
