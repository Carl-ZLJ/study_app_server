import mongoose, { Document, Schema, Model } from 'mongoose'
import User from './User'

interface StudentDoc extends Document {
	studentName: string
	grade: string
	age: string
	taskIds: string[]
	userId: string
	addTask: (taskId: string) => void
	addSchedule: (scheduleId: string) => void
}

interface StudentModel extends Model<StudentDoc> {}

const schema = new mongoose.Schema(
	{
		studentName: { type: String, required: true },
		grade: { type: String, required: true },
		age: { type: String, required: true },
		taskIds: { type: [Schema.Types.ObjectId], ref: 'Task', default: [] },
		scheduleIds: {
			type: [Schema.Types.ObjectId],
			ref: 'Schedule',
			default: [],
		},
		userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	},
	{
		timestamps: true,
	}
)

schema.methods.addTask = function (taskId: string) {
	this.taskIds.push(taskId)
	this.save()
}

schema.methods.addSchedule = function (scheduleId: string) {
	this.schedulesIds.push(scheduleId)
	this.save()
}

schema.pre<StudentDoc>('save', async function () {
	if (this.isNew) {
		const user = await User.findById(this.userId)
		await user?.addStudent(this._id)
	}
})

export default mongoose.model<StudentDoc, StudentModel>('Student', schema)
