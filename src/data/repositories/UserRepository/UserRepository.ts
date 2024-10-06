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
      queryFn: async () => this.userNetwork.getUser(),
    })

    return result
  }
}

export const userRepository = new UserRepository(cacheServiceInstance, userNetworkSources)
