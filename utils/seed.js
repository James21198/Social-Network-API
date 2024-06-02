const connection = require('../config/connection');
const { Thoughts, User } = require('../models');
const { getRandomName, getRandomThoughts } = require('./data');

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

  for (let i = 0; i < 20; i++) {
    const thoughts = getRandomThoughts(20);

    const fullName = getRandomName();
    const first = fullName.split(' ')[0];
    const last = fullName.split(' ')[1];

    users.push({
      first,
      last,
      thoughts,
    });
  }

  const userData = await User.insertMany(users);

  await Thoughts.insertOne({
    thoughtName: 'OMG!!!',
    inPerson: false,
    users: [...userData.map(({_id}) => _id)],
  });

  console.table(users);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
