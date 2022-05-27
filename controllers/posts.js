import Post from '../models/Post.js';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';

export const getAllPosts = asyncHandler(async (req, res, next) => {
  const posts = await Post.find();
  res.json(posts);
});

export const createPost = asyncHandler(async (req, res, next) => {
  const { body } = req;
  const newPost = await Post.create({ ...body });
  res.status(201).json(newPost);
});

export const getSinglePost = asyncHandler(async (req, res, next) => {
  const {
    params: { id }
  } = req;
  const post = await Post.findById(id);
  if (!post) throw new ErrorResponse(`Post with id of ${id} doesn't exist`, 404);
  res.send(post);
});

export const updatePost = asyncHandler(async (req, res, next) => {
  const {
    body,
    params: { id }
  } = req;
  const found = await Post.findById(id);
  if (!found) throw new Error(`Post with id of ${id} doesn't exist`);
  const updatedPost = await Post.findOneAndUpdate({ _id: id }, body, { new: true });
  res.json(updatedPost);
});

export const deletePost = asyncHandler(async (req, res, next) => {
  const {
    params: { id }
  } = req;
  const found = await Post.findById(id);
  if (!found) throw new Error(`Post with id of ${id} doesn't exist`);
  await Post.deleteOne({ _id: id });
  res.json({ success: `Post with id of ${id} was deleted` });
});
