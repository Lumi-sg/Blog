import he from "he";
import { useRouteLoaderData } from "react-router-dom";
import { BlogPostResponse } from "../../Types/Blogpost";
import Footer from "../Footer/Footer";
import "./Blogpost.css";
const Blogpost = () => {
	const response = useRouteLoaderData("post") as BlogPostResponse;
	const blogPost = response.foundBlogPost;

	return (
		<div className="mainContainer">
			<div className="blogPostContainer">
				<div className="post-container">
					<h1 className="blogpost-title">{he.decode(blogPost.title)}</h1>
					<p className="blogpost-author">
						{blogPost.author.username} - {blogPost.timePosted}
					</p>
					<div
						className="contentContainer"
						dangerouslySetInnerHTML={{ __html: he.decode(blogPost.content) }}
					/>
				</div>
				{blogPost.comments.length > 0 && (
					<div className="commentsContainer">
						<h2>Comments:</h2>
						{blogPost.comments.map((comment, index) => (
							<div
								className="comment"
								key={index}
							>
								<strong className="comment-username">
									{he.decode(comment.username)}
								</strong>
								<p>{he.decode(comment.commentContent)}</p>
								<p>{comment.timePosted}</p>
							</div>
						))}
					</div>
				)}
				<form
					action="/commentform"
					method="POST"
				>
					<label htmlFor="username">Name:</label>
					<input
						type="text"
						name="username"
						required
					/>

					<label htmlFor="commentContent">Comment:</label>
					<input
						type="text"
						name="commentContent"
						required
					/>

					<input
						type="hidden"
						name="postId"
						value={blogPost._id}
					/>
					<div className="buttonContainer">
						<button type="submit">Send</button>
					</div>
				</form>
			</div>
			<Footer />
		</div>
	);
};

export default Blogpost;
