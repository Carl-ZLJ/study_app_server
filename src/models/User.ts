import mongoose from 'mongoose'
import { hashSync } from 'bcrypt'

const schema = new mongoose.Schema(
	{
		username: { type: String, required: true, unique: true },
		passwordHash: { type: String, required: true },
	},
	{ timestamps: true }
)

schema.methods.setPasswordHash = function(password: string): void {
	this.passwordHash = hashSync(password, 10)
}

export default mongoose.model('User', schema)
