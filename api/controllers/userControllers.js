const User = require('../models/userModels');

const STATUS_USER_ERROR = 422;

const createUser = (req, res) => {
  const { username, password } = req.body;
  const newUser = { username, password };
  const user = new User(newUser);
  user.save((err, createdUser) => {
    if (err) {
      res.status(STATUS_USER_ERROR);
      res.json({ error: 'Error inserting into users' });
      return;
    }
    res.json(createdUser);
  });
};

const login = (req, res) => {
  const { username, password } = req.body;
  const userToLogin = { username, password };
  User.findOne(userToLogin, (err, user) => {
    if (err) {
      res.status(STATUS_USER_ERROR);
      res.json({ error: 'Cannot find user' });
      return;
    }
    res.json(user);
  });
};

module.exports = {
  createUser,
  login
};