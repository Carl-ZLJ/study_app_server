import mongoose, { Document, Schema } from 'mongoose'
import Student from './Student'

interface ScheduleDoc extends Document {
	day: string
	timeStart: string
	timeEnd: string
	content: string
	studentId: string
}

const schema = new mongoose.Schema(
	{
		day: { type: String, required: true },
		content: { type: String, required: true },
		timeStart: { type: Number, required: true },
		timeEnd: { type: Number, required: true },
		studentId: {
			type: Schema.Types.ObjectId,
			ref: 'Student',
			required: true,
		},
	},
	{
		timestamps: true,
	}
)

schema.pre<ScheduleDoc>('save', async function () {
	if (this.isNew) {
		const student = await Student.findById(this.studentId)
		await student?.addTask(this._id)
	}
})

export default mongoose.model<ScheduleDoc>('Schedule', schema)
