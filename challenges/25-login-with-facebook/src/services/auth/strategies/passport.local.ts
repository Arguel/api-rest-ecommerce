import passport from "passport";
import {Strategy as LocalStrategy} from "passport-local";
import {UserModel} from "../../../models/mongodb/user";
import {IUser} from "../../../utils/modelsInterfaces";
import bcrypt from "bcrypt";

const isValidPassword = (user: IUser, password: string) => {
  return bcrypt.compareSync(password, user.password);
};

const createHash = (password: string) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

passport.use(
  "login",
  new LocalStrategy(function (username, password, done) {
    UserModel.findOne({username: username}, function (err: Error, user: IUser) {
      if (err) return done(err);
      if (!user) {
        console.log("User not found with username" + username);
        return done(null, false);
      }
      if (!isValidPassword(user, password)) {
        console.log("Invalid password");
        return done(null, false);
      }
      return done(null, user);
    });
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
    UserModel.findOne({username: username}, function (err: Error, user: IUser) {
      if (err) return done(err);
      if (user) {
        console.log("User already exists");
        return done(null, false);
      } else {
        const newUser = new UserModel({
          username,
          password: createHash(password),
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
      return done(null, user);
    });
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
