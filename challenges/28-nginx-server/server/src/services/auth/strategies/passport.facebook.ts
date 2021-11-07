import passport from "passport";
import {Strategy as FacebookStrategy} from "passport-facebook";
import {UserModel} from "../../../models/mongodb/user";
import {IUser} from "../../../libs/interfaces/models.interfaces";
import dotenv from "dotenv";
import {CallbackError} from "mongoose";
import args from "args";

const nodeArgv = args.parse(process.argv);

// Environment Variables
dotenv.config();

passport.use(
  new FacebookStrategy(
    {
      clientID:
        nodeArgv.facebookClientId || (process.env.FACEBOOK_APP_ID as string),
      clientSecret:
        nodeArgv.facebookClientSecret ||
        (process.env.FACEBOOK_APP_SECRET_KEY as string),
      callbackURL: "/auth/facebook/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      UserModel.findOne(
        {"facebook.id": profile.id},
        function (err: Error, user: IUser) {
          if (err) return done(err);

          if (!user) {
            const newUser = new UserModel({
              name: profile.displayName,
              email: profile.emails[0].value,
              username: profile.username,
              provider: "facebook",
              facebook: profile._json,
            });
            newUser.save(function (err: CallbackError) {
              if (err) {
                console.log("Error in saving user: " + err);
                throw err;
              }
              return done(null, user);
            });
          }

          return done(null, user);
        },
      );
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
