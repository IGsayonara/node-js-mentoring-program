import { deepClone } from '../../helpers/deepClone.ts';
import { IOrder } from '../order.interface.ts';

export class OrderMapper implements IOrder {
  id;
  userId;
  cartId;
  items;
  payment;
  delivery;
  comments;
  status;
  total;
  protected base: any;

  constructor(obj: any) {
    this.base = deepClone(obj);
    this.setId();
    this.setUserId();
    this.setCartId();
    this.setItems();
    this.setPayment();
    this.setDelivery();
    this.setStatus();
    this.setComments();
    this.setTotal();
  }

  protected setId() {
    this.id = this.base.id;
  }

  protected setUserId() {
    this.userId = this.base.userId;
  }

  protected setCartId() {
    this.userId = this.base.cartId;
  }

  protected setItems() {
    this.items = this.base.items;
  }

  protected setPayment() {
    this.payment = this.base.payment;
  }

  protected setDelivery() {
    this.delivery = this.base.delivery;
  }

  protected setComments() {
    this.comments = this.base.comments;
  }

  protected setStatus() {
    this.status = this.base.status;
  }

  protected setTotal() {
    this.total = this.base.total;
  }
  public getOrder(): IOrder {
    return {
      id: this.id,
      cartId: this.cartId,
      items: this.items,
      payment: this.payment,
      comments: this.comments,
      total: this.total,
      delivery: this.delivery,
      status: this.status,
      userId: this.userId,
    };
  }
}
