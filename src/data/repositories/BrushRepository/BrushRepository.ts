import { brushSources } from '../../sources/brush/brushSources';
import { groupsBrushes } from './brushes';
import { difference } from 'remeda';
import {
  cacheService,
  CacheService,
} from '../../../shared';
import { createAsyncSignalQuery } from '../../../shared/services/AsyncSignal/AsyncSignalQuery';

export class BrushRepository {
  constructor(
    private readonly _cacheService: CacheService,
  ) {}

  public get groupsBrushes() {
    return groupsBrushes;
  }

  public getBrushList = () => {
    const result = this._cacheService.createQuery({
      queryKey: ['brushList'],
      queryFn: async () => {
        const result = await brushSources.getBrushes();
        return result;
      },
    });

    return result;
  }

  public getClastersBrusheList = () => {
    const result = createAsyncSignalQuery({
      queryKey: ['clastersBrushList'],
      queryFn: async () => {
        const result = await brushSources.getClastersBrushes();
        return result;
      },
    });

    return result;
  }

  // public blockClastersBrushesByIds = (ids: string[] = []) => {
  //   if (ids.length === 0) return this.clastersBrushes;
  //   let whiteList = {};
  //   const filteredClasters = Object.entries(clastersBrushes);
  //   filteredClasters.forEach(([key, value]) => {
  //     const keyWhiteList = difference(value.values, ids);
  //     if (keyWhiteList.length > 0) {
  //       whiteList = { ...whiteList, [key]: { ...value, values: keyWhiteList } };
  //     }
  //   });
    
  //   return whiteList;
  // };
}

export const brushRepository = new BrushRepository(cacheService);
