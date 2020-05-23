const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to mongoDB...'))
  .catch(err => console.error('could not connect to MongoDB...', err));

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    // match:/pattern/,

  },
  category: {
    type: String,
    required: true,
    enum: ['web', 'mobile', 'network'],
    lowercase: true,
    // uppercase: true,
    trim: true
  },
  author: String,
  tags: {
    type: Array,
    validate: {
      isAsync: true,
      validator: function (value, callback) {
        setTimeout(() => {
          // Do some async work
          const result = value && value.length > 0;
          callback(result);
        }, 2000);
      },
      message: 'A course should have at least one tag.'
    }
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function () {
      return this.isPublished;
    },
    min: 10,
    max: 200,
    get: value => Math.round(value),
    set: value => Math.round(value)
  }
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
  const course = new Course({
    name: 'Angular Course',
    category: 'Web',
    author: 'JosephCollins',
    tags: ['frontend'],
    isPublished: true,
    price: 15.8
  });

  try {
    // await course.validate();
    const result = await course.save();
    console.log(result);
  } catch (error) {
    for (field in error.errors)
      console.log(error.errors[field].message);
  }

}

async function getCourses() {
  const pageNumber = 2;
  const pageSize = 10;

  const courses = await Course
    .find({ _id: '5ec7c9581388d83a84db31e4' })
    // .skip((pageNumber - 1) * pageSize)
    // .limit(8)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1, price: 1 })
  console.log(courses[0].price);
}

async function removeCourse(id) {
  // const result = await Course.deleteOne({ _id: id });
  const course = await Course.findByIdAndRemove(id);
  console.log(course);
}

//removeCourse('5ec4f8f398d665808cf1e229');
//createCourse();
getCourses();