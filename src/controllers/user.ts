import express, { Request, Response } from 'express'
import User from '../models/User'

const user = express.Router()

user.post('/signup', (req: Request, res: Response) => {
	const { username, password } = req.body.user
	const user = new User({ username })
	user.setPasswordHash(password)
	user.save().then(user => res.status(200).json({ user: user.toAuthJson() }))
})

user.post('/signin', async (req: Request, res: Response) => {
	const { username, password } = req.body.user
	const user = await User.findOne({ username })
	if (user && user.validPassword(password)) {
		res.status(200).json({ user: user.toAuthJson() })
	} else if (user) {
		res.status(400).json({ errors: { global: 'Invalid Password' } })
	} else {
		res.status(400).json({ errors: { global: 'Invalid Username' } })
	}
})

export default user
