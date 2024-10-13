import { httpService } from "../../../shared";

export const userNetworkSources = {
  async getUser() {
    const result = await httpService.get('user').json();

    return result
  },

  async logOut() {
    const result = await httpService.post('logout/google').json();

    return result
  }
};
