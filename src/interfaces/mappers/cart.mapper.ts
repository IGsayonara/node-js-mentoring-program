import { deepClone } from '../../helpers/deepClone.ts';
import { ICart } from '../cart.interface.ts';

export class CartMapper implements ICart {
  id;
  userId;
  isDeleted;
  items;

  protected base: any;

  constructor(obj: any) {
    this.base = deepClone(obj);
    this.setId();
    this.setUserId();
    this.setItems();
    this.setIsDeleted();
  }

  protected setId() {
    this.id = this.base.id;
  }

  protected setUserId() {
    this.userId = this.base.userId;
  }

  protected setIsDeleted() {
    this.isDeleted = this.base.isDeleted;
  }

  protected setItems() {
    this.items = this.base.items;
  }

  public getCart(): ICart {
    return {
      id: this.id,
      userId: this.userId,
      items: this.items,
      isDeleted: this.isDeleted,
    };
  }
}
