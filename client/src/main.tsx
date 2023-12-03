import React from "react";
import ReactDOM from "react-dom/client";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import Blogpost from "./Components/Blogpost/Blogpost.tsx";
import ErrorPage from "./Components/ErrorPage/ErrorPage.tsx";
import Index from "./Components/Index/Index.tsx";
import "./index.css";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Navigate to="/index" />,
	},

	{
		path: "/index",
		element: <Index />,
		errorElement: <ErrorPage />,
	},
	{
		path: "/post/:id",
		element: <Blogpost />,
		errorElement: <ErrorPage />,
	},
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
