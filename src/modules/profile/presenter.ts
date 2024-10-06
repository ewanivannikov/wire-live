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
}

export const profilePresenter = new ProfilePresenter(userRepository)
