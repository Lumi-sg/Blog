"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var moment_1 = __importDefault(require("moment"));
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1["default"].Schema;
var BlogPostSchema = new Schema({
    title: { type: String, required: true, minlength: 2, maxlength: 100 },
    content: { type: String, required: true, minlength: 5, maxlength: 5000 },
    author: { type: Schema.Types.ObjectId, ref: "User" },
    timePosted: {
        type: String,
        required: true,
        "default": moment_1["default"]().format("MMMM D, YYYY - h:mm A")
    },
    lastEdited: { type: String, required: false },
    comments: []
});
BlogPostSchema.pre("save", function (next) {
    if (!this.timePosted) {
        this.timePosted = moment_1["default"]().format("MMMM D, YYYY - h:mm A");
    }
    next();
});
BlogPostSchema.pre("updateOne", function (next) {
    if (!this.lastEdited) {
        this.lastEdited = moment_1["default"]().format("MMMM D, YYYY - h:mm A");
    }
    next();
});
BlogPostSchema.virtual("url").get(function () {
    return "/post/" + this._id;
});
exports.BlogPostModel = mongoose_1["default"].model("BlogPost", BlogPostSchema);
//# sourceMappingURL=BlogPost.js.map