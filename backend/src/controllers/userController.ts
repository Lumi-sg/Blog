import express from "express";
import passport from "passport";

export const login_user_post = (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) => {
	passport.authenticate("local", (err: any, user: any, info: any) => {
		if (err) {
			return next(err);
		}
		if (!user) {
			// Access the error message from info
			const errorMessage = info && info.message ? info.message : "Unknown error.";
			return res.render("login", { errorMessage });
		}
		req.logIn(user, (err) => {
			if (err) {
				return next(err);
			}
			console.log(`User ${user.username} logged in.`);
			return res.redirect("/blogpostform");
		});
	})(req, res, next);
};
