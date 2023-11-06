export interface IUser {
  id: string; // uuid
  activeCartId: string | null;
  name: string;
  email: string;
}
