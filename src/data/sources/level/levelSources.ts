import { httpService } from '../../../shared/services/HttpService';

export const levelSources = {
  getLevels: async () => {
    try {
      const result = await httpService.get('./level/levels.json').json();
      return result;
    } catch (error) {
      return error;
    }
  },
  getLevelById: async (id: string) => {
    try {
      const result = await httpService.get(`./level/${id}.json`).json();
      return result;
    } catch (error) {
      return error;
    }
  },
}
