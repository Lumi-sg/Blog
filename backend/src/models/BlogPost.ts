import express from "express";
import moment from "moment";
import mongoose, { Document } from "mongoose";
import { Comment } from "./Comment";
import { User } from "./User";

const Schema = mongoose.Schema;

export type BlogPost = Document & {
	title: string;
	content: string;
	author: User;
	timePosted: string;
	lastEdited?: string;
	comments: Comment[];
};

const BlogPostSchema = new Schema<BlogPost>({
	title: { type: String, required: true, minlength: 2, maxlength: 100 },
	content: { type: String, required: true, minlength: 5, maxlength: 5000 },
	author: { type: Schema.Types.ObjectId, ref: "User" },
	timePosted: {
		type: String,
		required: true,
		default: moment().format("MMMM D, YYYY - h:mm A"),
	},
	lastEdited: { type: String, required: false },
	comments: [],
	// comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

BlogPostSchema.pre<BlogPost>("save", function (next) {
	if (!this.timePosted) {
		this.timePosted = moment().format("MMMM D, YYYY - h:mm A");
	}
	next();
});

BlogPostSchema.pre<BlogPost>("updateOne", function (next) {
	if (!this.lastEdited) {
		this.lastEdited = moment().format("MMMM D, YYYY - h:mm A");
	}
	next();
});

BlogPostSchema.virtual("url").get(function () {
	return `/post/${this._id}`;
});

export const BlogPostModel = mongoose.model<BlogPost>("BlogPost", BlogPostSchema);
