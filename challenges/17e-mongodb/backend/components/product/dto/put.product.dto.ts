export interface IPutProductDto {
  _id: string;
  timestamp: string;
  name: string;
  description: string;
  productCode: number;
  thumbnailUrl: string;
  price: number;
  stock: number;
}
