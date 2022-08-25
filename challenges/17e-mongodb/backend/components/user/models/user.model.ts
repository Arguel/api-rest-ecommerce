import MongooseService from '../../../services/mongoose/mongoose.service';

const Schema = MongooseService.getMongoose().Schema;

export const userSchema = new Schema(
  {
    id: String,
    email: String,
    password: { type: String, select: false },
    firstName: String,
    lastName: String,
    permissionLevel: Number,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const User = MongooseService.getMongoose().model('User', userSchema);
