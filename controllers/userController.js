const UserModel = require('../models/User');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find().populate('thoughts friends');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId).populate('thoughts friends');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const newUser = await UserModel.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateUserById = async (req, res) => {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(req.params.userId, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteUserById = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // If you have cascading delete logic to remove a user's thoughts, it would go here before deleting the user.
    await user.remove();
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.addFriend = async (req, res) => {
  try {
    const user = await UserModel.findByIdAndUpdate(
      req.params.userId,
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.removeFriend = async (req, res) => {
  try {
    const user = await UserModel.findByIdAndUpdate(
      req.params.userId,
      { $pull: { friends: req.params.friendId } },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
