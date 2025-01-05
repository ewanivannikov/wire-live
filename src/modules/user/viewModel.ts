import { makeAutoObservable } from 'mobx';
import { UserRepository, userRepository } from '../../data';

export class User {
  constructor(private readonly userRepository: UserRepository) {
    makeAutoObservable(this);
  }

  public get state() {
    return this.query.state;
  }

  public get isUnauthorized() {
    return this.query.state.error?.errors?.[0].response.status === 401;
  }

  private get mutation() {
    return this.userRepository.logOut();
  }

  private get query() {
    return this.userRepository.getUserQuery();
  }

  public logOut = async () => {
    try {
      await this.mutation.mutateAsync();
    } catch (error) {
      console.error('error❌❌❌', error);
    }
  };

  public logIn = () => {
    const login = this.userRepository.logIn();
    login.refetch();
  };
}

export const user = new User(userRepository);
