import React from "react";
import ReactDOM from "react-dom/client";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import Blogpost from "./Components/Blogpost/Blogpost.tsx";
import ErrorPage from "./Components/ErrorPage/ErrorPage.tsx";
import Index from "./Components/Index/Index.tsx";
import Loading from "./Components/Loading/Loading.tsx";
import "./main.css";

export const BASEURL = "http://localhost:3000";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Navigate to="/index" />,
	},

	{
		path: "/index",
		element: <Index />,
		loader: () => fetch(`${BASEURL}/posts`).then((response) => response.json()),
		id: "blogpost",
		errorElement: <ErrorPage />,
	},
	{
		path: "/post/:id",
		element: <Blogpost />,
		loader: async ({ params }) =>
			fetch(`${BASEURL}/post/${params.id}`).then((response) => response.json()),
		id: "post",
		errorElement: <ErrorPage />,
	},
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RouterProvider
			router={router}
			fallbackElement={<Loading />}
			future={{ v7_startTransition: true }}
		/>
	</React.StrictMode>
);
