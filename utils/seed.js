const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { users, thoughts, reactions } = require('./data');

const seedDatabase = async () => {
  try {
    // connect to the db
    await connection.on('error', (err) => err);

    // clear existing data in db
    await User.deleteMany({});
    await Thought.deleteMany({});

    // insert users in db
    const createdUsers = await User.insertMany(users);

    // insert thoughts and link with users
    for (let i = 0; i < thoughts.length; i++) {
      const thought = await Thought.create(thoughts[i]);

      await User.findOneAndUpdate(
        { username: thoughts[i].username },
        { $push: { thoughts: thought._id } },
        { new: true }
      );

      // add reactions to the thought
      if (i < reactions.length) {
        await Thought.findByIdAndUpdate(
          thought._id,
          { $addToSet: { reactions: reactions[i] } },
          { new: true }
        );
      }
    }

    // end the db connection  
    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
};

// call the seed function
seedDatabase();
