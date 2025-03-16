const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  name: {
    type: String,
    required: [true, "Course name is required"],
    trim: true
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    trim: true
  },
  courseId: {
    type: String,
    required: [true, "Course ID is required, please provide it"],
    unique: true, // Ensures no duplicate course IDs
    trim: true
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    min: [0, "Price must be a positive number"] // Ensures no negative prices
  },
  courseDetails: [
    {
      department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Dep",
        required: true
      },
      semester: {
        type: Number,
        required: true,
        min: [1, "Semester must be at least 1"],
        max: [8, "Semester cannot exceed 8"] // Adjust based on the number of semesters in your system
      },
      year: {
        type: Number,
        required: true,
        min: [2000, "Year must be a valid year"] // Ensure valid year range
      }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
