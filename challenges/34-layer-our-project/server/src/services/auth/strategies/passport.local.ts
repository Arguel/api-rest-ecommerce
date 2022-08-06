import passport from "passport";
import {Strategy as LocalStrategy} from "passport-local";
import {UserModel} from "../../../models/mongodb/user";
import {IUser} from "../../../libs/interfaces/models.interfaces";

passport.use(
  "login",
  new LocalStrategy(function (username, password, done) {
    UserModel.findOne(
      {displayName: username},
      function (err: Error, user: IUser) {
        if (err) return done(err);
        if (!user) {
          console.log("User not found with displayName" + username);
          return done(null, false);
        }
        if (!UserModel.comparePassword(password, user.password)) {
          console.log("Invalid password");
          return done(null, false);
        }
        return done(null, user);
      },
    );
  }),
);

passport.use(
  "register",
  new LocalStrategy({passReqToCallback: true}, function (
    req,
    username,
    password,
    done,
  ) {
    UserModel.findOne(
      {displayName: username},
      function (err: Error, user: IUser) {
        if (err) return done(err);
        if (user) {
          console.log("User already exists");
          return done(null, false);
        } else {
          const newUser = new UserModel({
            displayName: username,
            password: UserModel.encryptPassword(password),
          });
          newUser.save(function (err) {
            if (err) {
              console.log("Error in saving user:" + err);
              throw err;
            }
            console.log("User registration succesful");
            return done(null, newUser);
          });
        }
      },
    );
  }),
);

passport.serializeUser(function (user, done) {
  done(null, (user as IUser)._id);
});

passport.deserializeUser(function (id, done) {
  UserModel.findById(id, function (err: Error, user: IUser) {
    done(err, user);
  });
});
