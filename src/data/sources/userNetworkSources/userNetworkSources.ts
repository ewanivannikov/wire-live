import { httpService } from "../../../shared";

export const userNetworkSources = {
  async getUser() {
    const result = await httpService.get('user').json();

    return result
  },
};
