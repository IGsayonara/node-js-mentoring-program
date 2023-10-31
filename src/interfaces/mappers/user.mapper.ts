import { IUser } from '../user.interface.ts';
import { deepClone } from '../../helpers/deepClone.ts';

export class UserMapper implements IUser {
  id;
  activeCartId;
  protected base: any;
  name;
  email;

  constructor(obj: any) {
    this.base = deepClone(obj);
    this.setId();
    this.setActiveCartId();
    this.setName();
    this.setEmail();
  }

  protected setId() {
    this.id = this.base.id;
  }

  protected setActiveCartId() {
    this.activeCartId = this.base.activeCartId;
  }

  protected setName() {
    this.name = this.base.name;
  }

  protected setEmail() {
    this.name = this.base.name;
  }

  public getUser(): IUser {
    return {
      id: this.id,
      activeCartId: this.activeCartId,
      name: this.name,
      email: this.email,
    };
  }
}
