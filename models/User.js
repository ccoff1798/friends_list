const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true, // Ensure usernames are unique
      required: true,
      trim: true, // Trims whitespace from the username
      maxLength: 50,
    },
    email: {
      type: String,
      unique: true, // Ensure emails are unique
      required: true,
      match: [/.+\@.+\..+/, 'Please fill a valid email address'], // Regex to validate the email
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought', // Reference to the Thought model
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User', // Self-reference to the User model
      },
    ],
  },
  {
    toJSON: {
      virtuals: true, // Ensure virtuals are included when converting a document to JSON
      getters: true, // Enable getter transformation
    },
    id: false, // Disable the virtual `id` field
  }
);

// Virtual for friendCount
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

const User = model('User', userSchema);

module.exports = User;
