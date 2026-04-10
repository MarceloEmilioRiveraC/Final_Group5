 import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema({
  _id:        { type: String, required: true, unique: true },
  title:       { type: String, required: true, minlength: 3 },
  description: { type: String, default: '' },
  imageUrl:    { type: String, required: true },
  likes:       { type: Number, default: 0 },
  userId:      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  shared:      { type: Number, default: 0 },
  bought:      { type: Number, default: 0 },
}, { timestamps: true })

export const PostModel = mongoose.model('Post', PostSchema)