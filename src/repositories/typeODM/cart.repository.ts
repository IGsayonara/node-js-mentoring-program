import { ICart, ICartItem } from '../../interfaces/cart.interface.ts';
import { ICartRepository } from '../interfaces/ICartRepository.ts';
import CartModel from './models/cart.model.ts';
import { CartMapper } from '../../interfaces/mappers/cart.mapper.ts';
import UserModel from './models/user.model.ts';
import ProductModel from './models/product.model.ts';
import { ProductModelMapper } from './product.repository.ts';
import { deepClone } from '../../helpers/deepClone.ts';

export class CartModelMapper extends CartMapper {
  protected override setUserId() {
    this.id = this.base._id;
  }

  protected override setItems() {
    const items = deepClone(this.base.items) as ICartItem[];
    this.items = items.map((item) => ({
      product: item.product,
      count: item.count,
    }));
  }
}
export class CartRepositoryODM implements ICartRepository {
  getCartById = async (cartId: string): Promise<ICart> => {
    const cart = await CartModel.findById(cartId);
    return new CartModelMapper(cart).getCart();
  };

  createCart = async (
    userId: string,
    items: ICartItem[] = [],
    isDeleted = false,
  ): Promise<ICart> => {
    const newCart = new CartModelMapper(
      await new CartModel({ user: userId, items, isDeleted }).save(),
    ).getCart();
    const user = await UserModel.findById(userId);
    user.activeCart = newCart.id;

    await user.save();

    return newCart;
  };

  editCart = async (cartId: string, items: [string, number][]): Promise<ICart> => {
    const cart = await CartModel.findById(cartId);

    const productIds = items.map(([id]) => id);
    const products = await ProductModel.find().where('_id').in(productIds);

    if (products.length !== items.length) {
      throw 'Product not found';
    }

    cart.items = products.map((product, index) => {
      return {
        product: new ProductModelMapper(product).getProduct(),
        count: items[index][1],
        test: '24',
      };
    });

    await cart.save();
    return new CartModelMapper(cart).getCart();
  };

  deleteCart = async (userId: string) => {
    const user = await UserModel.findById(userId);
    const cart = await CartModel.findById(user.activeCart);

    user.activeCart = null;
    cart.isDeleted = true;

    await Promise.all([user.save(), cart.save()]);
  };
}
