import he from "he";
import { Link, useRouteLoaderData } from "react-router-dom";
import { ApiResponse } from "../../Types/APIResponse";
import Footer from "../Footer/Footer";
import "./index.css";
const Index = () => {
	const response = useRouteLoaderData("blogpost") as ApiResponse;

	return (
		<div className="mainContainer">
			<div className="card-container">
				{response.blogPosts.map((blogPost) => (
					<div
						className="card"
						key={he.decode(blogPost.title)}
					>
						<Link
							to={`/post/${blogPost._id}`}
							className="card-link"
						>
							<div className="card-title">{he.decode(blogPost.title)}</div>
						</Link>
						<div className="card-author">
							{he.decode(blogPost.author.username)}
						</div>
					</div>
				))}
			</div>
			<Footer />
		</div>
	);
};

export default Index;
