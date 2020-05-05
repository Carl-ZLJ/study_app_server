import express, { Response, Request } from 'express'
import Schedule from '../models/Schedule'

const schedule = express.Router()

schedule.get('/', async (req: Request, res: Response) => {
	const studentId = req.query.studentId
	const schedules = await Schedule.find({ studentId })
	res.status(200).json({ schedules })
})

schedule.post('/', async (req: Request, res: Response) => {
	const schedule = new Schedule(req.body.task)

	schedule.save().then((schedule) => res.status(200).json({ schedule }))
})

schedule.patch('/', async (req: Request, res: Response) => {
	const schedule = req.body.schedule
	Schedule.findOneAndUpdate(
		{ _id: schedule._id },
		{ ...schedule },
		{ new: true }
	).then((data) => res.status(200).json({ task: data }))
})

schedule.delete('/', async (req: Request, res: Response) => {
	const _id = req.query._id
	Schedule.findOneAndRemove({ _id }).then((data) =>
		res.status(200).json({ task: data })
	)
})

export default schedule
