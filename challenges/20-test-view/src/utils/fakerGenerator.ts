import faker from "faker";

export const gen = (qty: number): object[] => {
  const items: object[] = [];
  for (let i = 0; i < qty; i++) {
    const product: object = {
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      thumbnail: faker.image.imageUrl(),
    };
    items.push(product);
  }
  return items;
};
