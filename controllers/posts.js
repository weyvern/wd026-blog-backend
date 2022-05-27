import Post from '../models/Post.js';

export const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createPost = async (req, res) => {
  try {
    const { body } = req;
    const newPost = await Post.create({ ...body });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSinglePost = async (req, res) => {
  try {
    const {
      params: { id }
    } = req;
    const post = await Post.findById(id);
    if (!post) throw new Error(`Post with id of ${id} doesn't exist`);
    res.send(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const {
      body,
      params: { id }
    } = req;
    const found = await Post.findById(id);
    if (!found) throw new Error(`Post with id of ${id} doesn't exist`);
    const updatedPost = await Post.findOneAndUpdate({ _id: id }, body, { new: true });
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const {
      params: { id }
    } = req;
    const found = await Post.findById(id);
    if (!found) throw new Error(`Post with id of ${id} doesn't exist`);
    await Post.deleteOne({ _id: id });
    res.json({ success: `Post with id of ${id} was deleted` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
