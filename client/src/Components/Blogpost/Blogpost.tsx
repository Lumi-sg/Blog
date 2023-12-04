import { useRouteLoaderData } from "react-router-dom";
import { BlogPostResponse } from "../../Types/Blogpost";
import Footer from "../Footer/Footer";

const Blogpost = () => {
	const response = useRouteLoaderData("post") as BlogPostResponse;
	const blogPost = response.foundBlogPost;

	return (
		<div className="mainContainer">
			<Footer />
		</div>
	);
};

export default Blogpost;
