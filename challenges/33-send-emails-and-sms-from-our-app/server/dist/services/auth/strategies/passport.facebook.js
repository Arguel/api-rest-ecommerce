"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var passport_1 = __importDefault(require("passport"));
var passport_facebook_1 = require("passport-facebook");
var user_1 = require("../../../models/mongodb/user");
var config_1 = __importDefault(require("config"));
var _a = config_1.default.default.facebookApp, appId = _a.appId, appSecret = _a.appSecret;
passport_1.default.use(new passport_facebook_1.Strategy({
    clientID: appId,
    clientSecret: appSecret,
    callbackURL: "http://localhost:8080/api/auth/facebook/callback",
    profileFields: ["id", "displayName", "name", "picture", "email"],
}, function (accessToken, refreshToken, profile, done) {
    console.log("perfil", profile);
    user_1.UserModel.findOne({ "facebook.id": profile.id }, function (err, user) {
        if (err)
            return done(err);
        if (!user) {
            console.log(profile);
            var id = profile.id, displayName = profile.displayName, _json = profile._json;
            var newUser_1 = new user_1.UserModel({
                displayName: displayName,
                password: user_1.UserModel.encryptPassword(Math.random().toString(16)),
                facebook: { id: id, displayName: displayName, _json: _json },
            });
            newUser_1.save(function (err) {
                if (err) {
                    console.log("Error in saving user: " + err);
                    throw err;
                }
                return done(null, newUser_1);
            });
        }
        else {
            return done(null, user);
        }
    });
}));
passport_1.default.serializeUser(function (user, done) {
    done(null, user._id);
});
passport_1.default.deserializeUser(function (id, done) {
    user_1.UserModel.findById(id, function (err, user) {
        done(err, user);
    });
});
