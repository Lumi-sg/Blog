import { Comment } from "./Comment";
import { User } from "./User";
export type BlogPost = {
	title: string;
	content: string;
	author: User;
	timePosted: string;
	lastEdited?: string;
	comments: Comment[];
};
