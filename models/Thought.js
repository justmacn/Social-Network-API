const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const dateFormat = require('../utils/dateFormat');

// creates model schema for all thought documents in the collection
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// getter to add a virtual property of reaction totals to document when queried
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

// new instance of the model to create the 'thoughts' collection and link the schema
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
