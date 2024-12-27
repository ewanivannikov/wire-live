import { makeAutoObservable } from "mobx";
import { UserRepository, userRepository } from "../../data";

export class ProfilePresenter {
  constructor(private readonly userRepository: UserRepository) {
    makeAutoObservable(this);
  }

  public get query() {
    return this.userRepository.getUserQuery()
  }

  public get state() {
    return this.query.state
  }

  public get isUnauthorized() {
    return this.query.state.error?.errors?.[0].response.status === 401
  }

  private get mutation() {
    return this.userRepository.logOut()
  }

  public logOut = async () => {
    try {
      await this.mutation.mutateAsync();
    } catch (error) {
      console.error('error❌❌❌', error)
    }
  }

  public logIn = () => {
    const login = this.userRepository.logIn();
    login.refetch()
  }

}

export const profilePresenter = new ProfilePresenter(userRepository)
