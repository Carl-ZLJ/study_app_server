import express, { Request, Response } from 'express'
import User from '../models/User'

const user = express.Router()

user.post('/', (req: Request, res: Response) => {
	res.send('Hello world')
})

export default user
