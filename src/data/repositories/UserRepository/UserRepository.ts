import { fromPromise } from "mobx-utils"
import { userNetworkSources } from "../../sources"
import { cacheService as cacheServiceInstance, CacheService } from "../../../shared"

export class UserRepository {
  constructor(
    private readonly cacheService: CacheService,
    private readonly userNetwork: typeof userNetworkSources
  ) { }

  public getUserQuery = () => {
    const result = this.cacheService.createQuery({
      queryKey: ["user"],
      queryFn: async () => {
        const result = await this.userNetwork.getUser()
        return result
      },
    })

    return result
  }

  public logOut = () => {
    const result = this.cacheService.createMutation({
      mutationFn: () => this.userNetwork.logOut(),
    })
    return result
  }

  public logIn = () => {
    const result = this.cacheService.createQuery({
      queryKey: ['login-user'],
      queryFn: () => async () => {
        const result = await this.userNetwork.logIn()
        return result
      },
    })
    return result
  }
}

export const userRepository = new UserRepository(cacheServiceInstance, userNetworkSources)
