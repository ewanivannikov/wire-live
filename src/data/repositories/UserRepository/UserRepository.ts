import { fromPromise } from "mobx-utils"
import { userNetworkSources } from "../../sources"

export class UserRepository {
  constructor(private readonly userNetwork: typeof userNetworkSources) { }

  public getUserQuery = () => {
    const result = fromPromise(this.userNetwork.getUser())

    return result
  }
}

export const userRepository = new UserRepository(userNetworkSources)
