import mongoose, { Schema, Document } from 'mongoose'
import { hashSync, compareSync } from 'bcrypt'
import jwt, { Secret } from 'jsonwebtoken'

interface UserDoc extends Document {
	username: string
	passwordHash: string
	setPasswordHash: (password: string) => void
	validPassword: (password: string) => boolean
	toAuthJson: () => JSON
}

const schema: Schema = new mongoose.Schema(
	{
		username: { type: String, required: true, unique: true },
		passwordHash: { type: String, required: true },
	},
	{ timestamps: true }
)

schema.methods.setPasswordHash = function(password: string): void {
	this.passwordHash = hashSync(password, 10)
}

schema.methods.validPassword = function(password: string) {
	return compareSync(password, this.passwordHash)
}

schema.methods.toAuthJson = function() {
	return jwt.sign(
		{
			username: this.username,
		},
		process.env.JWTSECRET_KEY as Secret
	)
}

export default mongoose.model<UserDoc>('User', schema)
