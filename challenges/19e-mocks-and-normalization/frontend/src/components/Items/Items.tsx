import { IProduct } from 'common/types/product.interface';
import Product from 'components/Product/Product';
import { selectAllProducts } from 'features/products/productsApiSlice';
import { useSelector } from 'react-redux';

const Items = () => {
  const products = useSelector(selectAllProducts);

  return (
    <section className="col-md-12 col-lg-9 col-xl-12">
      {!products.length ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-grow text-secondary my-2" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <ul className="list-unstyled ps-3">
          {products.map((product: IProduct) => (
            <Product product={product} key={product.id} />
          ))}
        </ul>
      )}
    </section>
  );
};

export default Items;
