import mongoose, { Schema, Document, Model } from 'mongoose'
import { hashSync, compareSync } from 'bcrypt'
import jwt, { Secret } from 'jsonwebtoken'

interface UserDoc extends Document {
	username: string
	passwordHash: string
	studentIds: string[]
	setPasswordHash: (password: string) => void
	validPassword: (password: string) => boolean
	toAuthJson: () => JSON
	addStudent: (studentId: string) => void
}

interface UserModel extends Model<UserDoc> {}

const schema: Schema = new mongoose.Schema(
	{
		username: { type: String, required: true, unique: true },
		passwordHash: { type: String, required: true },
		studentIds: {
			type: [Schema.Types.ObjectId],
			ref: 'Student',
			default: [],
		},
	},
	{ timestamps: true }
)

schema.methods.setPasswordHash = function(password: string): void {
	this.passwordHash = hashSync(password, 10)
}

schema.methods.addStudent = function(studentId: string): void {
	this.studentIds.push(studentId)
	this.save()
}

schema.methods.validPassword = function(password: string) {
	return compareSync(password, this.passwordHash)
}

schema.methods.toAuthJson = function() {
	return jwt.sign(
		{
			username: this.username,
			userId: this._id,
		},
		process.env.JWTSECRET_KEY as Secret
	)
}

export default mongoose.model<UserDoc, UserModel>('User', schema)
