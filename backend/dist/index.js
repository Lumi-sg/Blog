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
var body_parser_1 = __importDefault(require("body-parser"));
var compression_1 = __importDefault(require("compression"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var cors_1 = __importDefault(require("cors"));
var dotenv_1 = __importDefault(require("dotenv"));
var express_1 = __importDefault(require("express"));
var express_session_1 = __importDefault(require("express-session"));
var http_1 = __importDefault(require("http"));
var mongoose_1 = __importDefault(require("mongoose"));
var passport_1 = __importDefault(require("passport"));
var path_1 = __importDefault(require("path"));
require("./auth/passportConfig");
var User_1 = require("./models/User");
var router_1 = __importDefault(require("./router/router"));
var app = express_1["default"]();
dotenv_1["default"].config();
app.use(cors_1["default"]({
    credentials: true
}));
app.use(compression_1["default"]());
app.use(body_parser_1["default"].json());
//DB Stuff
var MONGO_URL = process.env.MONGODBURL;
mongoose_1["default"].set("strictQuery", false);
if (!MONGO_URL) {
    console.error("MONGODBURL environment variable is not set.");
    process.exit(1); // Exit the application with an error code.
}
mongoose_1["default"].Promise = Promise;
mongoose_1["default"].connect(MONGO_URL);
//Mongo connection info
mongoose_1["default"].connection.on("error", function (error) {
    console.log(error);
});
mongoose_1["default"].connection.on("open", function () {
    console.log("Connected to MongoDB");
});
mongoose_1["default"].connection.on("close", function () {
    console.log("Disconnected from MongoDB");
});
//View Engine
app.set("view engine", "ejs");
app.set("views", path_1["default"].join(__dirname, "views"));
app.use(express_1["default"].json());
app.use(express_1["default"].urlencoded({ extended: false }));
app.use(cookie_parser_1["default"]());
app.use(express_1["default"].static(path_1["default"].join(__dirname, "../public")));
// //Middleware
app.use(express_session_1["default"]({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport_1["default"].initialize());
app.use(passport_1["default"].session());
passport_1["default"].serializeUser(function (user, done) {
    done(null, user.id);
});
passport_1["default"].deserializeUser(function (id, done) { return __awaiter(void 0, void 0, void 0, function () {
    var user, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, User_1.UserModel.findById(id)];
            case 1:
                user = _a.sent();
                done(null, user);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                done(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.use(function (req, res, next) {
    res.locals.user = req.user;
    next();
});
// Default route
app.use("/", router_1["default"]);
var server = http_1["default"].createServer(app);
var port = 3000;
server.listen(port, function () {
    console.log("Server running on http://localhost:" + port);
});
//# sourceMappingURL=index.js.map