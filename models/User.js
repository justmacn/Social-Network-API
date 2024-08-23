const { Schema, model } = require('mongoose');

// creates model schema for all user documents in the collection
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trimmed: true,
    },
    //uses email regex to validate any address entered
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must use a valid email address'], 
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
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// getter to add a virtual property of friends total to document when queried
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

// new instance of the model to create the 'users' collection and link the schema
const User = model('User', userSchema);

module.exports = User;
