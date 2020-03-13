import mongoose, { Document } from 'mongoose'

interface StudentDoc extends Document {
	studentName: string
	grade: string
	age: string
}

const schema = new mongoose.Schema(
	{
		studentName: { type: String, required: true },
		grade: { type: String, required: true },
		age: { type: String, required: true },
	},
	{
		timestamps: true,
	}
)

export default mongoose.model<StudentDoc>('Student', schema)
