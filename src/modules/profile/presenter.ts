import { makeAutoObservable, runInAction } from "mobx";
import { UserRepository, userRepository } from "../../data";
import { run } from "node:test";

export class ProfilePresenter {
  data = {
    state: 'pending',
    value: null
  }

  constructor(private readonly userRepository: UserRepository) {
    makeAutoObservable(this);
  }

  public loadData = () => {
    runInAction(() => {
      this.data = this.userRepository.getUserQuery()
      console.log('this.data', this.data);

    })
  }
}

export const profilePresenter = new ProfilePresenter(userRepository)
