import he from "he";
import { useEffect } from "react";
import { useNavigate, useRouteLoaderData } from "react-router-dom";
import { BlogPostResponse } from "../../Types/Blogpost";
import { BASEURL } from "../../main";
import Footer from "../Footer/Footer";
import "./Blogpost.css";
const Blogpost = () => {
	const response = useRouteLoaderData("post") as BlogPostResponse;
	const blogPost = response.foundBlogPost;
	const navigate = useNavigate();

	useEffect(() => {
		return () => {
			document.title = he.decode(blogPost.title.toString());
		};
	}, []);

	const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const username = (e.target as any).elements.username.value;
		const commentContent = (e.target as any).elements.commentContent.value;

		try {
			const response = await fetch(`${BASEURL}/commentform`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					username,
					commentContent,
					postId: blogPost._id,
				}),
			});

			if (response.ok) {
				// Handle success, e.g., show a success message
				(e.target as any).elements.username.value = "";
				(e.target as any).elements.commentContent.value = "";
				console.log("Comment submitted successfully");
				navigate(`/post/${blogPost._id}`);
			} else {
				// Handle error, e.g., show an error message
				console.error("Error submitting comment:", response.statusText);
				alert("Error submitting comment");
			}
		} catch (error: any) {
			console.error("Error during comment form submission:", error.message);
			alert("Error submitting comment");
		}
	};

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
					onSubmit={handleCommentSubmit}
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
