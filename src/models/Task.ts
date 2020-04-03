import mongoose, { Document, Schema } from 'mongoose'
import Student from './Student'

interface TaskDoc extends Document {
	title: string
	subject: string
	content: string
	deadline: string
	finishedTime: string
	status: boolean
	studentId: string
}

const schema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		subject: { type: String, required: true },
		content: { type: String, required: true },
		deadline: { type: String, required: true },
		finishedTime: { type: String },
		status: { type: Boolean, default: false },
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

schema.pre<TaskDoc>('save', async function() {
	if (this.isNew) {
		const student = await Student.findById(this.studentId)
		await student?.addTask(this._id)
	}
})

export default mongoose.model<TaskDoc>('Task', schema)
