import passport from "passport";
import {Strategy as FacebookStrategy} from "passport-facebook";
import {UserModel} from "../../../models/mongodb/user";
import {IUser} from "../../../libs/interfaces/models.interfaces";
import dotenv from "dotenv";

// Environment Variables
dotenv.config();

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID as string,
      clientSecret: process.env.FACEBOOK_APP_SECRET_KEY as string,
      callbackURL: "asd",
    },
    function (accessToken, refreshToken, profile, done) {
      UserModel.findOrCreate(profile.id, function (err: Error, user: IUser) {
        if (err) return done(err);
        done(null, user);
      });
    },
  ),
);

passport.serializeUser(function (user, done) {
  done(null, (user as IUser)._id);
});

passport.deserializeUser(function (id, done) {
  UserModel.findById(id, function (err: Error, user: IUser) {
    done(err, user);
  });
});
