"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var dotenv_1 = __importDefault(require("dotenv"));
var express_async_handler_1 = __importDefault(require("express-async-handler"));
var express_validator_1 = require("express-validator");
var he_1 = __importDefault(require("he"));
var moment_1 = __importDefault(require("moment"));
var BlogPost_1 = require("../models/BlogPost");
exports.blogpost_list_get = express_async_handler_1["default"](function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var blogPosts, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, BlogPost_1.BlogPostModel.find()
                        .sort({ timePosted: -1 })
                        .populate("author")];
            case 1:
                blogPosts = _a.sent();
                res.json({ blogPosts: blogPosts });
                return [2 /*return*/];
            case 2:
                error_1 = _a.sent();
                res.status(500).json({ message: error_1.message });
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.blogpost_get = express_async_handler_1["default"](function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var foundBlogPost, encodedContent, decodedContent, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, BlogPost_1.BlogPostModel.findById(req.params.id).populate("author")];
            case 1:
                foundBlogPost = _a.sent();
                if (foundBlogPost) {
                    encodedContent = foundBlogPost.content;
                    decodedContent = he_1["default"].decode(encodedContent);
                    foundBlogPost.content = decodedContent;
                    res.json({ foundBlogPost: foundBlogPost });
                    return [2 /*return*/];
                }
                else {
                    res.status(404).json({ error: "Blog post not found" });
                    return [2 /*return*/];
                }
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                res.status(500).json({ message: error_2.message });
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.comment_form_post = [
    express_validator_1.body("username")
        .trim()
        .isLength({ min: 2, max: 25 })
        .escape()
        .withMessage("Name must be between 2 and 25 characters long."),
    express_validator_1.body("commentContent")
        .trim()
        .isLength({ min: 2, max: 144 })
        .escape()
        .withMessage("Comment must be between 2 and 144 characters long."),
    express_async_handler_1["default"](function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var errors, _a, username, commentContent, postId, comment, blogpost, error_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 6, , 7]);
                    errors = express_validator_1.validationResult(req);
                    if (!!errors.isEmpty()) return [3 /*break*/, 1];
                    res.status(400).json({ errors: errors.array() });
                    return [2 /*return*/];
                case 1:
                    _a = req.body, username = _a.username, commentContent = _a.commentContent, postId = _a.postId;
                    console.log("Received Post ID from form:", postId);
                    comment = {
                        commentContent: commentContent,
                        username: username,
                        timePosted: moment_1["default"]().format("MMMM D, YYYY - h:mm A")
                    };
                    return [4 /*yield*/, BlogPost_1.BlogPostModel.findById(postId)];
                case 2:
                    blogpost = _b.sent();
                    if (!blogpost) return [3 /*break*/, 4];
                    blogpost.comments.push(comment);
                    return [4 /*yield*/, blogpost.save()];
                case 3:
                    _b.sent();
                    console.log("Successfully created comment by " + username);
                    res.status(200).json({
                        message: "Comment created successfully",
                        comment: comment
                    });
                    return [2 /*return*/];
                case 4:
                    res.status(404).json({ error: "Post not found" });
                    return [2 /*return*/];
                case 5: return [3 /*break*/, 7];
                case 6:
                    error_3 = _b.sent();
                    console.error("Error during comment form post:", error_3);
                    res.status(500).json({ message: error_3.message });
                    return [2 /*return*/];
                case 7: return [2 /*return*/];
            }
        });
    }); }),
];
//backend-frontend stuff -------------------------------------------
exports.blogpost_form_get = express_async_handler_1["default"](function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var TINYMCE_API_KEY, user;
    return __generator(this, function (_a) {
        dotenv_1["default"].config();
        TINYMCE_API_KEY = process.env.TINYMCE_API_KEY;
        user = req.user;
        res.render("blogpostform", { errors: [], user: user, TINYMCE_API_KEY: TINYMCE_API_KEY });
        return [2 /*return*/];
    });
}); });
exports.blogpost_form_post = [
    express_validator_1.body("title")
        .trim()
        .isLength({ min: 5, max: 100 })
        .escape()
        .withMessage("Title must be between 1 and 100 characters long."),
    express_validator_1.body("content")
        .trim()
        .isLength({ min: 5, max: 5000 })
        .escape()
        .withMessage("Content must be between 1 and 5000 characters long."),
    express_async_handler_1["default"](function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var errors, user, _a, title, content, blogpost, error_4;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 4, , 5]);
                    errors = express_validator_1.validationResult(req);
                    user = req.user;
                    _a = req.body, title = _a.title, content = _a.content;
                    if (!!errors.isEmpty()) return [3 /*break*/, 1];
                    res.render("blogpostform", {
                        title: title,
                        content: content,
                        errors: errors.array(),
                        user: user
                    });
                    console.log("Failed to create message " + title + " by user " + user.username + ".");
                    return [3 /*break*/, 3];
                case 1:
                    blogpost = new BlogPost_1.BlogPostModel({
                        title: title,
                        content: content,
                        author: user,
                        comments: []
                    });
                    return [4 /*yield*/, blogpost.save()];
                case 2:
                    _b.sent();
                    console.log("Successfully created message " + title + " by " + user.username + ".");
                    res.redirect("/blogpostform");
                    return [2 /*return*/];
                case 3: return [3 /*break*/, 5];
                case 4:
                    error_4 = _b.sent();
                    console.error("Error during blogpost form post:", error_4);
                    res.status(500).send("Internal Server Error");
                    return [2 /*return*/];
                case 5: return [2 /*return*/];
            }
        });
    }); }),
];
//# sourceMappingURL=blogpostController.js.map