const express = require('express');
const router = express.Router()
const Joi = require('joi');

const courses = [
  { id: 1, name: 'course1' },
  { id: 2, name: 'course2' },
  { id: 3, name: 'course3' },
  { id: 4, name: 'course4' },
];

// GET
router.get('/', (req, res) => {
  res.send(courses);
});

// POST
router.post('/', (req, res) => {
  const { error } = validateCourse(req.body); // same as result.error
  if (error) return res.status(400).send(error.details[0].message);
  router.use(() => {
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
router.get('/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send('the course with the given id was not found');
  res.send(course);
});

// PUT
router.put('/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send('the course with the given id was not found');

  const { error } = validateCourse(req.body); // same as result.error
  if (error) return res.status(400).send(error.details[0].message);

  course.name = req.body.name;
  res.send(course);
});

// DELETE
router.delete('/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send('the course with the given id was not found');

  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
});

function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required()
  };
  return Joi.validate(course, schema);
}

module.exports = router;

