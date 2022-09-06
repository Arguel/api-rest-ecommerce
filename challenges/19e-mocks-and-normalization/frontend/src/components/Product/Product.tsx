import { IProduct } from 'common/types/product.interface';
import { Link } from 'react-router-dom';

const Product = (product: IProduct) => {
  return (
    <li className="m-2 shop-w-220px d-inline-block">
      <div className="border m-2 rounded">
        <Link className="d-block" to={`/product/${product._id}`}>
          <div className="m-auto p-2 h-200px overflow-hidden">
            <figure className="figure w-100 h-100">
              <img
                className="mw-100 mh-100 min-h-100 obfit-cover d-block m-auto"
                src={product.imageUrl ?? ''}
                alt={product.name}
              />
            </figure>
          </div>
        </Link>
        <div className="p-2 h-130px">
          <h5 className="my-2 text-truncate ff-lato-4 child-underline">
            <Link className="c-under text-dark" to={`/product/${product._id}`}>
              {product.name}
            </Link>
          </h5>
          <div className="overflow-hidden text-truncate-2">
            <div className="ff-mont-6 text-truncate-1">
              <span>
                {(
                  product.price -
                  (product.price * product.discount) / 100
                ).toFixed(2)}
              </span>
            </div>
          </div>
          <div className="text-truncate">{product.description}</div>
        </div>
        <div className="pb-2 px-2">
          <button className="btn btn-primary d-block w-100 ff-lato-4">
            Add to Cart
          </button>
        </div>
      </div>
    </li>
  );
};

export default Product;
