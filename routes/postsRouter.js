import { Router } from 'express';
import verifyToken from '../middlewares/verifyToken.js';
import validateJOI from '../middlewares/validateJOI.js';
import {
  createPost,
  deletePost,
  getAllPosts,
  getSinglePost,
  updatePost
} from '../controllers/posts.js';
import { postSchema } from '../joi/schemas.js';

const postsRouter = Router();

postsRouter.route('/').get(getAllPosts).post(verifyToken, validateJOI(postSchema), createPost);

postsRouter
  .route('/:id')
  .get(getSinglePost)
  .put(verifyToken, updatePost)
  .delete(verifyToken, deletePost);

export default postsRouter;
