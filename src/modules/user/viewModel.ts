import { makeAutoObservable } from 'mobx';
import { UserRepository, userRepository } from '../../data';

export class User {
  constructor(
    private readonly userRepository: UserRepository,
  ) {
    makeAutoObservable(this);
  }

  public get state() {
    const serviceUnavailable = this.query.state.error?.errors?.[0].response.status === 503;
    
    if(serviceUnavailable) {
      window.location.href = 'https://localhost:3001/#/about';
    }
    return this.query.state;
  }

  public refetch = () => {
    return this.query.refetch()
  }

  public get isUnauthorized() {
    const unauthorized = this.query.state.error?.errors?.[0].response.status === 401;
    if(unauthorized) {
      const redirectUrl = encodeURIComponent(window.location.href);
      window.location.href = `/oauth2/google?redirect_uri=${redirectUrl}`;
    }
    return unauthorized;
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
