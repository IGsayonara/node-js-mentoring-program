import { IUser } from '../user.interface.ts';
import { deepClone } from '../../helpers/deepClone.ts';

export class UserMapper implements IUser {
  id;
  activeCartId;
  protected base: any;

  constructor(obj: any) {
    this.base = deepClone(obj);
    this.setId();
    this.setActiveCartId();
  }

  protected setId() {
    this.id = this.base.id;
  }

  protected setActiveCartId() {
    this.activeCartId = this.base.activeCartId;
  }

  public getUser(): IUser {
    return {
      id: this.id,
      activeCartId: this.activeCartId,
    };
  }
}
