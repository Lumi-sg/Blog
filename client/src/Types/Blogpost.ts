import { Comment } from "./Comment";
import { User } from "./User";
export type BlogPostType = {
	_id: number;
	title: string;
	content: string;
	author: User;
	timePosted: string;
	lastEdited?: string;
	comments: Comment[];
};

export type BlogPostResponse = {
	foundBlogPost: BlogPostType;
};
