"use strict";
const __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : {"default": mod};
};
Object.defineProperty(exports, "__esModule", {value: true});
const passport_1 = __importDefault(require("passport"));
const passport_facebook_1 = require("passport-facebook");
const user_1 = require("../../../models/mongodb/user");
const config_1 = __importDefault(require("config"));
const _a = config_1.default.default.facebookApp; const appId = _a.appId; const appSecret = _a.appSecret;
passport_1.default.use(new passport_facebook_1.Strategy({
    clientID: appId,
    clientSecret: appSecret,
    callbackURL: "/auth/facebook/callback",
}, function (accessToken, refreshToken, profile, done) {
    user_1.UserModel.findOne({"facebook.id": profile.id}, function (err, user) {
        if (err)
            return done(err);
        if (!user) {
            const newUser = new user_1.UserModel({
                name: profile.displayName,
                email: profile.emails[0].value,
                username: profile.username,
                provider: "facebook",
                facebook: profile._json,
            });
            newUser.save(function (err) {
                if (err) {
                    console.log("Error in saving user: " + err);
                    throw err;
                }
                return done(null, user);
            });
        }
        return done(null, user);
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
