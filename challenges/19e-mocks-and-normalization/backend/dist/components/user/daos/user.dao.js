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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import mongoose from 'mongoose';
const nanoid_1 = require("nanoid");
const debug_1 = __importDefault(require("debug"));
const user_model_1 = require("../models/user.model");
const log = (0, debug_1.default)('app:users-dao');
class UsersDao {
    constructor() {
        log('Created new instance of UsersDao');
    }
    addUser(userFields) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = (0, nanoid_1.nanoid)();
            const user = new user_model_1.User(Object.assign({ id: userId, permissionLevel: 1 }, userFields));
            yield user.save();
            return userId;
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return user_model_1.User.findOne({ email: email }).exec();
        });
    }
    getUserByEmailWithPassword(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return user_model_1.User.findOne({ email: email })
                .select('id email permissionLevel +password')
                .exec();
        });
    }
    removeUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return user_model_1.User.deleteOne({ _id: userId }).exec();
        });
    }
    getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return user_model_1.User.findOne({ _id: userId }).populate('User').exec();
        });
    }
    getUsers(limit = 25, page = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            return user_model_1.User.find()
                .limit(limit)
                .skip(limit * page)
                .exec();
        });
    }
    updateUserById(userId, userFields) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield user_model_1.User.findOneAndUpdate({ _id: userId }, { $set: userFields }, { new: true }).exec();
            return existingUser;
        });
    }
}
exports.default = new UsersDao();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5kYW8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9jb21wb25lbnRzL3VzZXIvZGFvcy91c2VyLmRhby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLG1DQUFtQztBQUNuQyxtQ0FBZ0M7QUFDaEMsa0RBQTBCO0FBSTFCLHFEQUE0QztBQUU1QyxNQUFNLEdBQUcsR0FBb0IsSUFBQSxlQUFLLEVBQUMsZUFBZSxDQUFDLENBQUM7QUFFcEQsTUFBTSxRQUFRO0lBQ1o7UUFDRSxHQUFHLENBQUMsa0NBQWtDLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRVksT0FBTyxDQUFDLFVBQXlCOztZQUM1QyxNQUFNLE1BQU0sR0FBRyxJQUFBLGVBQU0sR0FBRSxDQUFDO1lBQ3hCLE1BQU0sSUFBSSxHQUFHLElBQUksaUJBQUksaUJBQ25CLEVBQUUsRUFBRSxNQUFNLEVBQ1YsZUFBZSxFQUFFLENBQUMsSUFDZixVQUFVLEVBQ2IsQ0FBQztZQUNILE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2xCLE9BQU8sTUFBTSxDQUFDO1FBQ2hCLENBQUM7S0FBQTtJQUVZLGNBQWMsQ0FBQyxLQUFhOztZQUN2QyxPQUFPLGlCQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDL0MsQ0FBQztLQUFBO0lBRVksMEJBQTBCLENBQUMsS0FBYTs7WUFDbkQsT0FBTyxpQkFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQztpQkFDbEMsTUFBTSxDQUFDLG9DQUFvQyxDQUFDO2lCQUM1QyxJQUFJLEVBQUUsQ0FBQztRQUNaLENBQUM7S0FBQTtJQUVZLGNBQWMsQ0FBQyxNQUFjOztZQUN4QyxPQUFPLGlCQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDaEQsQ0FBQztLQUFBO0lBRVksV0FBVyxDQUFDLE1BQWM7O1lBQ3JDLE9BQU8saUJBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDL0QsQ0FBQztLQUFBO0lBRVksUUFBUSxDQUFDLEtBQUssR0FBRyxFQUFFLEVBQUUsSUFBSSxHQUFHLENBQUM7O1lBQ3hDLE9BQU8saUJBQUksQ0FBQyxJQUFJLEVBQUU7aUJBQ2YsS0FBSyxDQUFDLEtBQUssQ0FBQztpQkFDWixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztpQkFDbEIsSUFBSSxFQUFFLENBQUM7UUFDWixDQUFDO0tBQUE7SUFFWSxjQUFjLENBQ3pCLE1BQWMsRUFDZCxVQUFxQzs7WUFFckMsTUFBTSxZQUFZLEdBQUcsTUFBTSxpQkFBSSxDQUFDLGdCQUFnQixDQUM5QyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsRUFDZixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsRUFDcEIsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQ2QsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUVULE9BQU8sWUFBWSxDQUFDO1FBQ3RCLENBQUM7S0FBQTtDQUNGO0FBRUQsa0JBQWUsSUFBSSxRQUFRLEVBQUUsQ0FBQyJ9