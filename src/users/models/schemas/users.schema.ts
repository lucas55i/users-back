import mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  name: String,
  BirthDate: Date,
  active: Boolean,
});
