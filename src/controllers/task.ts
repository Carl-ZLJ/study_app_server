import express, { Response, Request } from 'express'
import Task from '../models/Task'

const task = express.Router()

task.get('/', async (req: Request, res: Response) => {
	const studentId = req.query.studentId
	const tasks = await Task.find({ studentId })
	res.status(200).json({ tasks })
})

task.post('/', async (req: Request, res: Response) => {
	const task = new Task(req.body.task)

	task.save().then(task => res.status(200).json({ task }))
})

export default task
