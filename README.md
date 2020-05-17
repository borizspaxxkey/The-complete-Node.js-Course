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
