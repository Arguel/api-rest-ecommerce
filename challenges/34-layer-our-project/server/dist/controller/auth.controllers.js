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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
var ethereal_1 = require("../services/mailer/ethereal");
var gmail_1 = require("../services/mailer/gmail");
var AuthController = /** @class */ (function () {
    function AuthController() {
        var _this = this;
        this.postLogin = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var picture, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!req.isAuthenticated()) return [3 /*break*/, 6];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        ethereal_1.etherealMailOpt.subject = this.genSubject("A new login of the", req);
                        return [4 /*yield*/, ethereal_1.etherealTsp.sendMail(ethereal_1.etherealMailOpt)];
                    case 2:
                        _a.sent();
                        gmail_1.gmailMailOpt.subject = this.genSubject("A new login of the", req);
                        if (req.user.facebook) {
                            picture = req.user.facebook._json
                                .picture.data.url;
                            if (picture)
                                gmail_1.gmailMailOpt.subject = picture;
                        }
                        return [4 /*yield*/, gmail_1.gmailTsp.sendMail(gmail_1.gmailMailOpt)];
                    case 3:
                        _a.sent();
                        res.redirect("/");
                        return [3 /*break*/, 5];
                    case 4:
                        err_1 = _a.sent();
                        console.log(err_1);
                        return [3 /*break*/, 5];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        res.send("Invalid information check that the data entered is correct");
                        _a.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        this.getLogout = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var err_2, displayName;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        ethereal_1.etherealMailOpt.subject = this.genSubject("Log out of", req);
                        return [4 /*yield*/, ethereal_1.etherealTsp.sendMail(ethereal_1.etherealMailOpt)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        err_2 = _a.sent();
                        console.log(err_2);
                        return [3 /*break*/, 3];
                    case 3:
                        displayName = req.user.displayName;
                        req.session.destroy(function (err) {
                            if (err)
                                res.status(500).json({
                                    error: 500,
                                    description: "Unexpected error on the server side. Please try again later",
                                });
                            else
                                res.status(200).render("logout", { displayName: displayName });
                        });
                        return [2 /*return*/];
                }
            });
        }); };
    }
    AuthController.prototype.genSubject = function (msg, req) {
        return msg + " " + req.user.displayName + " account was detected in " + new Date().toString();
    };
    AuthController.prototype.getLogin = function (req, res) {
        res.status(200).render("login");
    };
    AuthController.prototype.getFailLogin = function (req, res) {
        res.status(200).render("loginError");
    };
    AuthController.prototype.getRegister = function (req, res) {
        res.status(200).render("register");
    };
    AuthController.prototype.getFailRegister = function (req, res) {
        res.status(200).render("registerError");
    };
    return AuthController;
}());
exports.AuthController = AuthController;
