import DOMPurify from "dompurify";
import { useEffect, useState } from "react";
import "./App.css";
import { BlogPost } from "./types/Blogpost";

function App() {
	const [blogData, setBlogData] = useState<BlogPost | undefined>(undefined);

	const baseAPIURL = "http://localhost:3000";

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					`${baseAPIURL}/post/656af31967f724597be6d526`
				);
				const data = await response.json();
				setBlogData(data.foundBlogPost); // Set the correct property from the response
			} catch (error) {
				console.error("Error fetching or parsing data:", error);
			}
		};

		fetchData();
	}, []);

	useEffect(() => {
		console.table(blogData);
	}, [blogData]);

	return (
		<>
			<div className="blogPostContainer">
				{blogData ? (
					<>
						<h1>{blogData.title}</h1>
						<div
							dangerouslySetInnerHTML={{
								__html: DOMPurify.sanitize(blogData.content),
							}}
						/>
						<p>
							Posted by {blogData.author.username} on {blogData.timePosted}
						</p>
						<h2>Comments</h2>
						{blogData.comments.map((comment, index) => (
							<div key={index}>
								<p>{DOMPurify.sanitize(comment.commentContent)}</p>
								<p>
									Comment by {comment.username} on {comment.timePosted}
								</p>
							</div>
						))}
					</>
				) : (
					<p>Loading...</p>
				)}
			</div>
		</>
	);
}

export default App;
