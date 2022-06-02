import User from '../models/User.js';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';

export const registerUser = asyncHandler(async (req, res, next) => {
  res.json({ success: 'User registered' });
});

export const loginUser = asyncHandler(async (req, res, next) => {
  res.json({ success: 'User logged in' });
});

export const getUser = asyncHandler(async (req, res, next) => {
  res.json({ success: 'this is the user' });
});
