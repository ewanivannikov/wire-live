import { httpService } from "../../../shared";

const messages = {MissingOrMalformedSID: 'SID отсутствует или повреждён'}

export const userNetworkSources = {
  async getUser() {
    try {
      const result = await httpService.get('user').json();
      return result
    } catch (error) {
      if (error.name === 'HTTPError') {
        const errorText = await error.response.text();
        const customError = new AggregateError([error], messages[errorText]);

        throw customError
      }
      
      return error
    }
  },

  async logOut() {
    const result = await httpService.post('logout/google').json();

    return result
  }
};
