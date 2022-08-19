import mongooseService from '../../../services/mongoose.service';
import { nanoid } from 'nanoid';
import debug from 'debug';
import { ICreateProductDto } from '../dto/create.product.dto';
import { IPatchProductDto } from '../dto/patch.product.dto';
import { IPutProductDto } from '../dto/put.product.dto';

const log: debug.IDebugger = debug('app:products-dao');

class ProductsDao {
  mongoose = mongooseService.getMongoose();

  productSchema = new this.mongoose.Schema<ICreateProductDto>(
    {
      _id: { type: String, required: true },
      timestamp: { type: String, required: true },
      name: { type: String, required: true },
      description: String,
      productCode: Number,
      thumbnailUrl: String,
      price: { type: Number, required: true },
      stock: { type: Number, required: true },
    },
    {
      timestamps: true,
      versionKey: false,
    }
  );

  Product = mongooseService.getMongoose().model('Product', this.productSchema);

  constructor() {
    log('Created new instance of ProductsDao');
  }

  public async addProduct(productFields: ICreateProductDto): Promise<string> {
    try {
      const productId: string = nanoid();
      const product = new this.Product({
        ...productFields,
        _id: productId,
      });
      await product.save();
      return productId;
    } catch (err) {
      throw new BaseError('Failed to save product', err, 'addProduct');
    }
  }

  public async getProductByEmail(email: string) {
    return this.Product.findOne({ email: email }).exec();
  }

  public async getProductByEmailWithPassword(email: string) {
    return this.Product.findOne({ email: email })
      .select('_id email permissionLevel +password')
      .exec();
  }

  public async removeProductById(productId: string) {
    return this.Product.deleteOne({ _id: productId }).exec();
  }

  public async getProductById(productId: string) {
    return this.Product.findOne({ _id: productId }).populate('Product').exec();
  }

  public async getProducts(limit = 25, page = 0) {
    return this.Product.find()
      .limit(limit)
      .skip(limit * page)
      .exec();
  }

  public async updateProductById(
    productId: string,
    productFields: IPatchProductDto | IPutProductDto
  ) {
    const existingProduct = await this.Product.findOneAndUpdate(
      { _id: productId },
      { $set: productFields },
      { new: true }
    ).exec();

    return existingProduct;
  }
}

export default new ProductsDao();
