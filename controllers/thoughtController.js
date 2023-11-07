const ThoughtModel = require('../models/Thought');
const UserModel = require('../models/User'); 
exports.getAllThoughts = async (req, res) => {
  try {
    const thoughts = await ThoughtModel.find({});
    res.json(thoughts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getThoughtById = async (req, res) => {
  try {
    const thought = await ThoughtModel.findById(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    res.json(thought);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createThought = async (req, res) => {
  try {
    const thought = await ThoughtModel.create(req.body);
    await UserModel.findByIdAndUpdate(
      req.body.userId,
      { $push: { thoughts: thought._id } },
      { new: true }
    );
    res.status(201).json(thought);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateThoughtById = async (req, res) => {
  try {
    const thought = await ThoughtModel.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true });
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    res.json(thought);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteThoughtById = async (req, res) => {
  try {
    const thought = await ThoughtModel.findByIdAndRemove(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    
    await UserModel.findByIdAndUpdate(
      thought.userId, 
      { $pull: { thoughts: req.params.thoughtId } },
      { new: true }
    );
    res.json({ message: 'Thought deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.addReaction = async (req, res) => {
  try {
    const thought = await ThoughtModel.findByIdAndUpdate(
      req.params.thoughtId,
      { $push: { reactions: req.body } },
      { new: true, runValidators: true }
    );
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    res.json(thought);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.removeReaction = async (req, res) => {
  try {
    const thought = await ThoughtModel.findByIdAndUpdate(
      req.params.thoughtId,
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    );
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found or reaction not found' });
    }
    res.json(thought);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = exports;
