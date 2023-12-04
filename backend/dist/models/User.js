"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1["default"].Schema;
var UserSchema = new Schema({
    username: { type: String, required: true, minLength: 2, maxLength: 25 },
    password: { type: String, required: true, minLength: 6 },
    adminStatus: { type: Boolean, required: true, "default": true }
});
exports.UserModel = mongoose_1["default"].model("User", UserSchema);
//# sourceMappingURL=User.js.map