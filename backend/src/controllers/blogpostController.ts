import dotenv from "dotenv";
import express from "express";
import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import he from "he";
import moment from "moment";
import { BlogPostModel } from "../models/BlogPost";
import { Comment } from "../models/Comment";
import { User, UserModel } from "../models/User";

export const blogpost_list_get = asyncHandler(
	async (req: express.Request, res: express.Response) => {
		try {
			const blogposts = await BlogPostModel.find()
				.sort({ timePosted: -1 })
				.populate("author");

			res.json({ blogposts });
		} catch (error: any) {
			res.status(500).json({ message: error.message });
		}
	}
);

export const blogpost_get = asyncHandler(
	async (req: express.Request, res: express.Response) => {
		try {
			const blogpost = await BlogPostModel.findById(req.params.id).populate(
				"author"
			);
			if (blogpost) {
				const encodedContent = blogpost.content;
				const decodedContent = he.decode(encodedContent);
				blogpost.content = decodedContent;
			}
			res.json({ blogpost });
		} catch (error: any) {
			res.status(500).json({ message: error.message });
		}
	}
);

export const comment_form_post = [
	body("username")
		.trim()
		.isLength({ min: 2, max: 25 })
		.escape()
		.withMessage("Name must be between 2 and 25 characters long."),
	body("commentContent")
		.trim()
		.isLength({ min: 2, max: 144 })
		.escape()
		.withMessage("Comment must be between 2 and 144 characters long."),

	asyncHandler(async (req: express.Request, res: express.Response) => {
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				res.status(400).json({ errors: errors.array() });
			} else {
				const { username, commentContent, postId } = req.body;

				console.log("Received Post ID from form:", postId);

				const comment: Comment = {
					commentContent,
					username,
					timePosted: moment().format("MMMM D, YYYY - h:mm A"),
				};

				const blogpost = await BlogPostModel.findById(postId);
				if (blogpost) {
					blogpost.comments.push(comment);
					await blogpost.save();
					console.log(`Successfully created comment by ${username}`);
					res.status(200).json({
						message: "Comment created successfully",
						comment,
					});
				} else {
					res.status(404).json({ error: "Post not found" });
				}
			}
		} catch (error: any) {
			console.error("Error during comment form post:", error);
			res.status(500).json({ message: error.message });
		}
	}),
];

//backend-frontend stuff -------------------------------------------
export const blogpost_form_get = asyncHandler(
	async (req: express.Request, res: express.Response) => {
		dotenv.config();
		const TINYMCE_API_KEY = process.env.TINYMCE_API_KEY;
		const user = req.user as User;
		res.render("blogpostform", { errors: [], user, TINYMCE_API_KEY });
	}
);

export const blogpost_form_post = [
	body("title")
		.trim()
		.isLength({ min: 5, max: 100 })
		.escape()
		.withMessage("Title must be between 1 and 100 characters long."),
	body("content")
		.trim()
		.isLength({ min: 5, max: 5000 })
		.escape()
		.withMessage("Content must be between 1 and 5000 characters long."),

	asyncHandler(async (req: express.Request, res: express.Response) => {
		try {
			const errors = validationResult(req);
			const user = req.user as User;
			const { title, content } = req.body;

			if (!errors.isEmpty()) {
				res.render("blogpostform", {
					title,
					content,
					errors: errors.array(),
					user,
				});
				console.log(
					`Failed to create message ${title} by user ${user.username}.`
				);
			} else {
				const blogpost = new BlogPostModel({
					title,
					content,
					author: user,
					comments: [],
				});
				await blogpost.save();
				console.log(`Successfully created message ${title} by ${user.username}.`);
				res.redirect("/blogpostform");
			}
		} catch (error) {
			console.error("Error during blogpost form post:", error);
			res.status(500).send("Internal Server Error");
		}
	}),
];
