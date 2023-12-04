"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var passport_1 = __importDefault(require("passport"));
exports.login_user_post = function (req, res, next) {
    passport_1["default"].authenticate("local", function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            // Access the error message from info
            var errorMessage = info && info.message ? info.message : "Unknown error.";
            return res.render("login", { errorMessage: errorMessage });
        }
        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            console.log("User " + user.username + " logged in.");
            return res.redirect("/blogpostform");
        });
    })(req, res, next);
};
//# sourceMappingURL=userController.js.map