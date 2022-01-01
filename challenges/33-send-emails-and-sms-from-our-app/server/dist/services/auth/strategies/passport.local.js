"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var passport_1 = __importDefault(require("passport"));
var passport_local_1 = require("passport-local");
var user_1 = require("../../../models/mongodb/user");
passport_1.default.use("login", new passport_local_1.Strategy(function (username, password, done) {
    user_1.UserModel.findOne({ displayName: username }, function (err, user) {
        if (err)
            return done(err);
        if (!user) {
            console.log("User not found with displayName" + username);
            return done(null, false);
        }
        if (!user_1.UserModel.comparePassword(password, user.password)) {
            console.log("Invalid password");
            return done(null, false);
        }
        return done(null, user);
    });
}));
passport_1.default.use("register", new passport_local_1.Strategy({ passReqToCallback: true }, function (req, username, password, done) {
    user_1.UserModel.findOne({ displayName: username }, function (err, user) {
        if (err)
            return done(err);
        if (user) {
            console.log("User already exists");
            return done(null, false);
        }
        else {
            var newUser_1 = new user_1.UserModel({
                displayName: username,
                password: user_1.UserModel.encryptPassword(password),
            });
            newUser_1.save(function (err) {
                if (err) {
                    console.log("Error in saving user:" + err);
                    throw err;
                }
                console.log("User registration succesful");
                return done(null, newUser_1);
            });
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
