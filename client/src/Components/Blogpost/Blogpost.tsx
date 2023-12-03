import React from "react";
import { useRouteLoaderData } from "react-router-dom";
import { BlogPostResponse, BlogPostType } from "../../Types/Blogpost";
import Footer from "../Footer/Footer";

const Blogpost = () => {
	const response = useRouteLoaderData("blogpost") as BlogPostResponse;
	console.table(response.foundBlogPost);

	return (
		<div className="mainContainer">
			<Footer />
		</div>
	);
};

export default Blogpost;
