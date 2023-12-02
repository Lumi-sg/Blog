import mongoose, { Document } from "mongoose";

const Schema = mongoose.Schema;

export type User = Document & {
	username: string;
	password: string;
	adminStatus: boolean;
};

const UserSchema = new Schema<User>({
	username: { type: String, required: true, minLength: 2, maxLength: 25 },
	password: { type: String, required: true, minLength: 6 },
	adminStatus: { type: Boolean, required: true, default: true },
});

export const UserModel = mongoose.model<User>("User", UserSchema);
