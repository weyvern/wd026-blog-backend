import Post from '../models/Post.js';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';

export const getAllPosts = asyncHandler(async (req, res, next) => {
  const posts = await Post.find().populate('author');
  res.json(posts);
});

export const createPost = asyncHandler(async (req, res, next) => {
  const { body, userId } = req;
  const newPost = await (await Post.create({ ...body, author: userId })).populate('author');
  res.status(201).json(newPost);
});

export const getSinglePost = asyncHandler(async (req, res, next) => {
  const {
    params: { id }
  } = req;
  const post = await Post.findById(id).populate('author');
  if (!post) throw new ErrorResponse(`Post with id of ${id} doesn't exist`, 404);
  res.send(post);
});

export const updatePost = asyncHandler(async (req, res, next) => {
  const {
    userId,
    body,
    params: { id }
  } = req;
  const found = await Post.findById(id);
  if (!found) throw new ErrorResponse(`Post with id of ${id} doesn't exist`, 404);
  if (userId !== found.author._id.toString())
    throw new ErrorResponse(`You have no permissions to update this article`, 401);
  const updatedPost = await Post.findOneAndUpdate({ _id: id }, body, { new: true });
  res.json(updatedPost);
});

export const deletePost = asyncHandler(async (req, res, next) => {
  const {
    userId,
    params: { id }
  } = req;
  const found = await Post.findById(id);
  if (!found) throw new Error(`Post with id of ${id} doesn't exist`);
  if (userId !== found.author._id.toString())
    throw new ErrorResponse(`You have no permissions to delete this article`, 401);
  await Post.deleteOne({ _id: id });
  res.json({ success: `Post with id of ${id} was deleted` });
});
