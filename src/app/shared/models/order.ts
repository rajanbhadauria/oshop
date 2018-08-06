import { ShoppingCart } from "./shopping-cart";

export class Order {
    datePlaced: number;
    items: any[];

    constructor(public userId, public shipping, shoppingCart: ShoppingCart) {
        this.datePlaced = new Date().getTime();
        this.items = shoppingCart.items.map(i => {
            return {         
              product: {
                title: i.title,
                price: i.price,
                image_url: i.image_url
              },
              quantity: i.quantity,
              totalPrice: i.totalPrice          
            }
          })
    }
}