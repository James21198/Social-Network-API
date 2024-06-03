const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomName, getRandomThoughts, getRandomEmail, getRandomReaction, getUserName } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
  let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
  if (thoughtCheck.length) {
    await connection.dropCollection('thoughts');
  }
  
  let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
  if (userCheck.length) {
    await connection.dropCollection('users');
  }
  const users = [];
  const thoughts = getRandomThoughts(10);

  
  const fullName = getRandomName();
  const userName = getUserName(fullName);
  const email = getRandomEmail();
  const reactions = getRandomReaction(3);
  const thoughtText = getRandomThoughts(2);
    
  users.push({
    userName,
    thoughtText,
    email,
  });
  thoughts.push({
    userName,
    thoughts,
    reactions,
  });

  
  await User.insertMany(users);
  await Thought.insertMany(thoughts);

  console.table(users);
  console.table(thoughts);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
