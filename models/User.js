const { Schema, model } = require('mongoose');
const assignmentSchema = require('./Assignment');
//Leftover

const userSchema = new Schema(
  {
   username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: emailRegex,
      },
      thoughts: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Thought',
        },
      ],
      friends: [
        {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
    assignments: [assignmentSchema],//Leftover
  },
  {
    toJSON: {
        virtuals: true,
        getters: true,
      },
      toObject: { virtuals: true }, 
    });
    

const Student = model('student', userSchema);

module.exports = Student;
