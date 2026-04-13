import mongoose from 'mongoose'

export enum UserRole {
  ADMIN = 'admin',
  CUSTOMER = 'customer',
}

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.CUSTOMER,
    },
  },
  { timestamps: true }
)

export const UserModel = mongoose.model('User', UserSchema)
