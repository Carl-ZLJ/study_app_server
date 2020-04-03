import express, { Response, Request } from 'express'
import Student from '../models/Student'

const student = express.Router()

student.get('/', async (req: Request, res: Response) => {
	const userId = req.query.userId
	const students = await Student.find(
		{ userId },
		'studentName grade age taskIds userId _id'
	)
	res.status(200).json({ students })
})

student.post('/', async (req: Request, res: Response) => {
	const student = new Student(req.body.student)

	student.save().then(student => res.status(200).json({ student }))
})

export default student
