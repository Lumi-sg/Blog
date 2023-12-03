import React from "react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

const ErrorPage = () => {
	const error = useRouteError();
	console.error(error);
	return (
		<div>
			<h1>Oops!</h1>
			<p>Sorry, an unexpected error has occurred.</p>
			<p>
				<i>
					{isRouteErrorResponse(error)
						? error.status || error.statusText
						: "Unknown error message"}
				</i>
			</p>
		</div>
	);
};

export default ErrorPage;
