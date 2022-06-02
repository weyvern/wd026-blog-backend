import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userSchema = new Schema({
  firstName: { type: String, required: [true, 'Firstname is required'] },
  lastName: { type: String, required: [true, 'Lastname is required'] },
  email: { type: String, required: [true, 'Email image is required'] },
  password: { type: String, required: [true, 'Password is required'], select: false },
  createdAt: { type: Date, default: Date.now }
});

export default model('User', userSchema);
