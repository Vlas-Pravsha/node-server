import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      res.status(400);
      throw new Error('All fields are required');
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    if (user) {
      return res.status(201).json({
        username: user.username,
        _id: user._id,
        email: user.email,
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error('All fields are required');
  }

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user._id,
        },
      },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error('Invalid credentials');
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { username, email, password, userId } = req.body;

    // Найдем пользователя
    const user = await User.findById(userId);

    if (!user) {
      res.status(404);
      throw new Error('Пользователь не найден');
    }

    // Обновление имени пользователя, если предоставлено
    if (username) {
      user.username = username;
    }

    // Обновление email, если предоставлен
    if (email) {
      // Проверка, не занят ли email другим пользователем
      const emailExists = await User.findOne({ email });
      if (emailExists && emailExists._id.toString() !== userId) {
        res.status(400);
        throw new Error('Этот email уже используется');
      }
      user.email = email;
    }

    // Обновление пароля, если предоставлен
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    // Сохраняем обновленного пользователя
    const updatedUser = await user.save();

    // Возвращаем обновленные данные
    res.status(200).json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
    });
  } catch (error) {
    next(error);
  }
};

const currentUser = async (req, res) => {
  res.json(req.user);
};

export { registerUser, loginUser, currentUser, updateUser };
