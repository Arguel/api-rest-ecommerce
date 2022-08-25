import MongooseService from '../../../services/mongoose/mongoose.service';

const Schema = MongooseService.getMongoose().Schema;

export const productSchema = new Schema(
  {
    name: { type: String, required: true },
    description: String,
    productCode: Number,
    thumbnailUrl: String,
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

productSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

export const Product = MongooseService.getMongoose().model(
  'Product',
  productSchema
);
