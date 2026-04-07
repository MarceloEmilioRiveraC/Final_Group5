import mongoose from 'mongoose'

const StatsSchema = new mongoose.Schema({
  totalPosts:    { type: Number, default: 0 },
  totalUsers:    { type: Number, default: 0 },
  totalLikes:    { type: Number, default: 0 },
  topPost:       { type: mongoose.Schema.Types.ObjectId, ref: 'Post', default: null },
  month:         { type: String, required: true },
}, { timestamps: true })

export const StatsModel = mongoose.model('Stats', StatsSchema)