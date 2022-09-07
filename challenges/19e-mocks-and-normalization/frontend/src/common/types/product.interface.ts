export interface IProduct {
  id: string;
  name: string;
  description?: string;
  productCode?: number;
  imageUrl?: string;
  hasFreeShipping?: boolean;
  discount?: number;
  promotion?: Array<string>;
  categories?: Array<string>;
  region?: Array<string>;
  rating?: number;
  payment?: Array<string>;
  price: number;
  stock: number;
  createdAt?: Date;
  updatedAt?: Date;
  __v: number;
}

export interface IProductsAdapter {
  ids: Array<string | number>;
  // A lookup table mapping entity IDs to the corresponding entity objects
  entities: {
    [index: number]: IProduct;
  };
}
