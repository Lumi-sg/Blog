import express from "express";
import "express-session";
import * as blogpostController from "../controllers/blogpostController";
import * as userController from "../controllers/userController";

const router = express.Router();

//Default route
router.get("/", (req: express.Request, res: express.Response) => {
	res.redirect("/posts");
});

//admin login
router.get("/login", (req: express.Request, res: express.Response) => {
	res.render("login", { errors: [] });
});
router.post("/login", userController.login_user_post);

//blogpost stuff
router.get("/posts", blogpostController.blogpost_list_get);
router.get("/post/:id", blogpostController.blogpost_get);
router.get("/blogpostform", blogpostController.blogpost_form_get);
router.post("/blogpostform", blogpostController.blogpost_form_post);
router.post("/commentform", blogpostController.comment_form_post);

export default router;
