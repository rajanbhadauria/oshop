import { Product } from './product';

export class Item {
  key: string;
  title: string;
  price: number;
  image_url: string; 
  quantity: number;

  get totalPrice() {
    return this.price * this.quantity;
  }
}
