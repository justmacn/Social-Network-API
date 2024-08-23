const { Thought, User } = require('../models');

module.exports = {
  // get all thoughts
  async getAllThoughts(req, res) {
    try {
      const thoughts = await Thought.find().select('-__v');
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // gets single thought by id
  async getThoughtById(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.id }).select('-__v');

      if (!thought) {
        return res.status(404).json({ message: 'No thought found with this id!' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // creates a new thought and adds to user's thought list
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);

      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: thought._id } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'Thought created but no user found with this id!' });
      }

      res.json('Thought created!');
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // updates a thought by id
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'No thought found with this id!' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // deletes a thought by id
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.id });

      if (!thought) {
        return res.status(404).json({ message: 'No thought found with this id!' });
      }

      await User.findOneAndUpdate(
        { thoughts: req.params.id },
        { $pull: { thoughts: req.params.id } },
        { new: true }
      );

      res.json({ message: 'Thought deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // adds a reaction to a thought
  async addReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'No thought found with this id!' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // removes a reaction from a thought
  async removeReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'No thought found with this id!' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

