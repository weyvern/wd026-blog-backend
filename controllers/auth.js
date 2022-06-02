import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';

export const registerUser = asyncHandler(async (req, res, next) => {
  /*  
    Validate the input => maybe use a middleware with Joi [x]
    Check if user already exists => User.find(by email) [x]
      if exists say no => throw ErrorResponse [x]
      if no exists create 
        Hash (and salt) the password [x] https://www.npmjs.com/package/bcrypt?activeTab=readme
        Create user [x]
        Create token jsonwebtoken https://www.npmjs.com/package/jsonwebtoken [x]
        Send token => res.json() res.set() res.cookie() [x]
  */
  const {
    body: { email, password, ...rest }
  } = req;
  const found = await User.findOne({ email });
  if (found) throw new ErrorResponse('User already exists', 403);
  const hash = await bcrypt.hash(password, 5);
  const { _id } = await User.create({ ...rest, email, password: hash });
  const token = jwt.sign({ _id }, process.env.JWT_SECRET);
  res.json({ token });
});

export const loginUser = asyncHandler(async (req, res, next) => {
  /*  
    Validate the input => maybe use a middleware with Joi [x]
    Check if user already exists => User.find(by email) [x]
      if no exists say no => throw ErrorResponse [x]
      if exists 
        verify the password [x] https://www.npmjs.com/package/bcrypt?activeTab=readme
        if password not a match => throw ErrorResponse [x]
        if password match
          Create token jsonwebtoken https://www.npmjs.com/package/jsonwebtoken [x]
          Send token => res.json() res.set() res.cookie() [x]
  */
  const {
    body: { email, password }
  } = req;
  const found = await User.findOne({ email }).select('+password');
  if (!found) throw new ErrorResponse(`User doesn't exist`, 404);
  const match = await bcrypt.compare(password, found.password);
  if (!match) throw new ErrorResponse('Password is incorrect', 400);
  const token = jwt.sign({ _id: found._id }, process.env.JWT_SECRET);
  res.json({ token });
});

export const getUser = asyncHandler(async (req, res, next) => {
  const { userId } = req;
  const user = await User.findById(userId);
  if (!user) throw new ErrorResponse(`User doesn't exist`, 404);
  res.json(user);
});
