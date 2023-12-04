"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
require("express-session");
var blogpostController = __importStar(require("../controllers/blogpostController"));
var userController = __importStar(require("../controllers/userController"));
var router = express_1["default"].Router();
//Default route
router.get("/", function (req, res) {
    res.redirect("/login");
});
//admin login
router.get("/login", function (req, res) {
    res.render("login", { errors: [] });
});
router.post("/login", userController.login_user_post);
//blogpost stuff
router.get("/posts", blogpostController.blogpost_list_get);
router.get("/post/:id", blogpostController.blogpost_get);
router.get("/blogpostform", blogpostController.blogpost_form_get);
router.post("/blogpostform", blogpostController.blogpost_form_post);
router.post("/commentform", blogpostController.comment_form_post);
exports["default"] = router;
//# sourceMappingURL=router.js.map