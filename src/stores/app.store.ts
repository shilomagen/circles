import { action, observable } from 'mobx';
import { User } from 'firebase';

export class AppStore {
  @observable user: User | null;

  @action
  setUser = (user: User | null) => this.user = user;
}
