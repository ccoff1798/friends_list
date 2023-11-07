

const mongoose = require('mongoose');
const UserModel = require('../models/User'); 
const ThoughtModel = require('../models/Thought'); 

const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/friendsListDB';

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const users = [
  {
    username: 'alice',
    email: 'alice@example.com',
    thoughts: [],
    friends: [],
  },
  {
    username: 'bob',
    email: 'bob@example.com',
    thoughts: [],
    friends: [],
  },

];

const thoughts = [
  {
    thoughtText: 'This is a thought by Alice',
    username: 'alice',
    reactions: [],
  },
  {
    thoughtText: 'This is a thought by Bob',
    username: 'bob',
    reactions: [],
  },

];


const seedUsers = async () => {
  try {
    await UserModel.deleteMany({});
    const createdUsers = await UserModel.insertMany(users);
    console.log('Users Seeded:', createdUsers);
    return createdUsers;
  } catch (error) {
    console.error('Error seeding users:', error);
  }
};


const seedThoughts = async () => {
  try {
    await ThoughtModel.deleteMany({});
    const createdThoughts = await ThoughtModel.insertMany(thoughts);
    console.log('Thoughts Seeded:', createdThoughts);
    return createdThoughts;
  } catch (error) {
    console.error('Error seeding thoughts:', error);
  }
};

const seedDatabase = async () => {
  await mongoose.connection.dropDatabase();
  const seededUsers = await seedUsers();
  await seedThoughts();

  mongoose.connection.close();
};

seedDatabase();
