import passport from "passport";
import {Strategy as FacebookStrategy} from "passport-facebook";
import {UserModel} from "../../../models/mongodb/user";
import {IUser} from "../../../libs/interfaces/models.interfaces";
import {CallbackError} from "mongoose";
import {IConfigDefault} from "../../../config/default";
import config from "config";

const {
  default: {
    facebookApp: {appId, appSecret},
  },
} = config as IConfigDefault;

passport.use(
  new FacebookStrategy(
    {
      clientID: appId,
      clientSecret: appSecret,
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
