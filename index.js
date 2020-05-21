const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to mongoDB...'))
  .catch(err => console.error('could not connect to MongoDB...', err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
  const course = new Course({
    name: 'Angular Course',
    author: 'JosephCollins',
    tags: ['angular', 'frontend'],
    isPublished: true
  });

  const result = await course.save();
  console.log(result);
}

async function getCourses() {
  const pageNumber = 2;
  const pageSize = 10;

  const courses = await Course
    .find({ author: 'JosephCollins' })
    .skip((pageNumber - 1) * pageSize)
    .limit(8)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 })
  console.log(courses);
}

async function updateCourse(id) {
  const result = await Course.update({ _id: id }, {
    $set: {
      author: 'Mosh',
      isPublished: false
    }
  });

  console.log(result);
}

updateCourse('5ec4f8f398d665808cf1e229');
