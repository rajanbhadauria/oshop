import { Product } from './product';

export class Item {
  key: string;
  title: string;
  price: number;
  image_url: string;

  constructor(public product: Product, public quantity: number) {
  }

  get totalPrice() {
    return this.product.price * this.quantity;
  }
}
