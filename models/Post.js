import mongoose from 'mongoose';
const { Schema, model, ObjectId } = mongoose;

const postSchema = new Schema({
  title: { type: String, required: [true, 'Title is required'] },
  author: { type: ObjectId, ref: 'User', required: [true, 'Author is required'] },
  image: { type: String, required: [true, 'Cover image is required'] },
  body: { type: String, required: [true, 'Body is required'] },
  date: { type: Date, default: Date.now }
});

export default model('Post', postSchema);
