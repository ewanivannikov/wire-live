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

}

export const profilePresenter = new ProfilePresenter(userRepository)
