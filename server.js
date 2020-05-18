const express = require('express');
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const Joi = require('joi');
const morgan = require('morgan');
const helmet = require('helmet');
const logger = require('./logger');
const config = require('config');

const app = express();

app.set('view engine', 'pug');
app.set('views', './views')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());

// Configuration 
console.log('Application Name:' + config.get('name'));
console.log('Mail Server:' + config.get('mail.host'));
console.log('Mail Password:' + config.get('mail.password'));

// DB work...
dbDebugger('Connected to the database');

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  startupDebugger('Morgan Enabled...')
}

app.use(logger);

const courses = [
  { id: 1, name: 'course1' },
  { id: 2, name: 'course2' },
  { id: 3, name: 'course3' },
  { id: 4, name: 'course4' },
];

app.get('/', (req, res) => {
  res.render('index', {
    title: 'My Express App',
    message: 'Hello'
  });
});

// GET
app.get('/api/courses', (req, res) => {
  res.send(courses);
});

// POST
app.post('/api/courses', (req, res) => {
  const { error } = validateCourse(req.body); // same as result.error
  if (error) return res.status(400).send(error.details[0].message);
  app.use(() => {
    console.log('Logging...');

  })
  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.send(course);
});

// GET 1 COURSE
app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send('the course with the given id was not found');
  res.send(course);
});

// PUT
app.put('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send('the course with the given id was not found');

  const { error } = validateCourse(req.body); // same as result.error
  if (error) return res.status(400).send(error.details[0].message);

  course.name = req.body.name;
  res.send(course);
});

// DELETE
app.delete('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send('the course with the given id was not found');

  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
});

//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required()
  };
  return Joi.validate(course, schema);
}