import { Item } from './item';
import { Product } from './product';

export class ShoppingCart {
    items: Item[] = [];
    constructor(private itemsMap) {
        this.itemsMap = itemsMap || {};
        for(let productId in itemsMap) {
            const item = itemsMap[productId];
            const x = new Item();
            Object.assign(x, item);
            x.key = productId;
            this.items.push(x);
        }
            
    }
    getQuantity(product: Product) {
        const item = this.itemsMap[product.key];
        return (item) ? item.quantity : 0;
     }

    get totalItemsCounts() {
        let cartItemsCount = 0;
        for (const productId in this.itemsMap) {
            cartItemsCount += this.itemsMap[productId].quantity;
      }
      return cartItemsCount;
    }

    get cartTotal() {
        let sum = 0;
        for (let productId in this.items) {
            sum += this.items[productId].totalPrice;       
        }
        return sum;
    }
}
