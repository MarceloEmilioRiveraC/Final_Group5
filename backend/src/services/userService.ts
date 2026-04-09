import { UserModel } from '../models/User'
import bcrypt from 'bcryptjs'

export const createUser = async (email: string, password: string) => {
  const hashed = await bcrypt.hash(password, 10)

  const user = new UserModel({
    email,
    password: hashed
  })

  return user.save()
}

export const loginUser = async (email: string, password: string) => {
  const user = await UserModel.findOne({ email })
  if (!user) throw new Error('User not found')

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) throw new Error('Invalid password')

  return user
}

export const getAllUsers = async () => {
  return UserModel.find().select('-password')
}