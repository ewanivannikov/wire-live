import { httpService } from '../../../shared/services/HttpService';
// import brushes from './brushes.json';

export const sandboxSources = {
  getSandboxes: async () => {
    try {
      const result = await httpService.get('./sandbox/sandboxes.json').json();
      return result;
    } catch (error) {
      return error;
    }
  },
  getSandboxById: async (id: string) => {
    try {
      const result = await httpService.get(`./sandbox/${id}.json`).json();
      return result;
    } catch (error) {
      return error;
    }
  },
}
