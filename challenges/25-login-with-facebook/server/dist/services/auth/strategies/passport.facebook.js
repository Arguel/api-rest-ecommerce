"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var passport_1 = __importDefault(require("passport"));
var passport_facebook_1 = require("passport-facebook");
var user_1 = require("../../../models/mongodb/user");
var dotenv_1 = __importDefault(require("dotenv"));
// Environment Variables
dotenv_1.default.config();
passport_1.default.use(new passport_facebook_1.Strategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "asd",
}, function (accessToken, refreshToken, profile, done) {
    user_1.UserModel.findOrCreate(profile.id, function (err, user) {
        if (err)
            return done(err);
        done(null, user);
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
