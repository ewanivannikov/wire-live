import { httpService } from '../../../shared/services/HttpService';
// import brushes from './brushes.json';

export const brushSources = {
  getBrushes: async () => {
    try {
      const result = await httpService.get('./brush/brushes.json').json();
      // const result = await Promise.resolve(brushes)
      return result;
    } catch (error) {
      return error;
    }
  },
  getClastersBrushes: async () => {
    try {
      const result = await httpService.get('./brush/clastersBrushes.json').json();
      return result;
    } catch (error) {
      return error;
    }
  }
}
