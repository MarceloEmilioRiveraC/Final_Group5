import { Request, Response } from 'express'
import * as postService from '../services/postService'

export const getAll = async (_req: Request, res: Response) => {
  try {
    const posts = await postService.getAllPosts()
    res.json(posts)
  } catch (e: any) {
    res.status(500).json({ message: e.message })
  }
}

export const create = async (req: Request, res: Response) => {
  try {
    const post = await postService.createPost(req.body)
    res.status(201).json(post)
  } catch (e: any) {
    res.status(400).json({ message: e.message })
  }
}

export const remove = async (req: Request, res: Response) => {
export const remove = async (req: Request, res: Response) => {
  try {
    await postService.deletePost(req.params.id)
    res.json({ message: 'Post deleted' })
  } catch (e: any) {
    res.status(404).json({ message: e.message })
  }
}

export const like = async (req: Request, res: Response) => {
  try {
    const post = await postService.likePost(req.params.id)
    res.json(post)
  } catch (e: any) {
    res.status(404).json({ message: e.message })
  }
}

export const share = async (req: Request, res: Response) => {
  try {
    const post = await postService.sharePost(req.params.id)
    res.json(post)
  } catch (e: any) {
    res.status(404).json({ message: e.message })
  }
}

export const bought = async (req: Request, res: Response) => {
  try {
    const post = await postService.boughtPost(req.params.id)
    res.json(post)
  } catch (e: any) {
    res.status(404).json({ message: e.message })
  }
}

