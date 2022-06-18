import generateID from '../helpers/generateID.js';
import generateJWT from '../helpers/generateJWT.js';
import User from '../models/User.js';

const createUser = async (req, res) => {
  const { email } = req.body;
  const userExist = await User.findOne({ email: email });

  if (userExist) {
    const error = new Error('User already register');
    return res.status(400).json({ msg: error.message });
  } else {
    try {
      const user = new User(req.body);
      user.token = generateID();
      const savedUser = await user.save();
      res.json(savedUser);
    } catch (error) {
      console.log(error);
    }
  }
};

const authenticate = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  // Check if user exist
  if (!user) {
    const error = new Error('User donst exist');
    return res.status(400).json({ msg: error.message });
  }

  // Check if user is confirmed
  if (!user.confirmed) {
    const error = new Error('Your account is not confirmed');
    return res.status(400).json({ msg: error.message });
  }

  // Check if password is correct
  if (await user.checkPassword(password)) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateJWT(user._id),
    });
  } else {
    const error = new Error('Password is wrong');
    return res.status(400).json({ msg: error.message });
  }
  res.send('login');
};

const confirm = async (req, res) => {
  const { token } = req.params;
  const confirmUser = await User.findOne({ token });

  if (!confirmUser) {
    const error = new Error('token incorrect');
    return res.status(400).json({ msg: error.message });
  }

  try {
    confirmUser.confirm = true;
    confirmUser.token = '';
    await confirmUser.save();
    res.json({ msg: 'user confirmed' });
  } catch (error) {
    console.log(error);
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error('User donst exist');
    return res.status(400).json({ msg: error.message });
  }

  try {
    user.token = generateID();
    await user.save();
    res.json({ msg: 'Message sent to email' });
  } catch (error) {
    console.log(error);
  }
};

const checksPassword = async (req, res) => {
  const { token } = req.params;
  const validToken = await User.findOne({ token });

  if (validToken) {
    res.json({ msg: 'Valid token, user exist' });
  } else {
    const error = new Error('Token not valid');
    return res.status(404).json({ msg: error });
  }
};

const newPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const user = await User.findOne({ token });

  if (user) {
    user.password = password;
    user.token = '';
    try {
      await user.save();
      res.json({ msg: 'Password changed correctly' });
    } catch (error) {
      console.log(error);
    }
  } else {
    const error = new Error('Token not valid');
    return res.status(404).json({ msg: error });
  }
};

const profile = async (req, res) => {
  console.log('profile');
};

export {
  createUser,
  authenticate,
  confirm,
  forgotPassword,
  checksPassword,
  newPassword,
  profile,
};