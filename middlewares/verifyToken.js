import jwt from 'jsonwebtoken';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';

const verifyToken = asyncHandler(async (req, res, next) => {
  const {
    headers: { authorization }
  } = req;
  if (!authorization) throw new ErrorResponse('Please login', 401);
  const { _id } = jwt.verify(authorization, process.env.JWT_SECRET);
  req.userId = _id;
  next();
});

export default verifyToken;
