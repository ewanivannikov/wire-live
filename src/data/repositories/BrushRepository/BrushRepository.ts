import { brushSources } from '../../sources/brush/brushSources';
import { LevelRepository, levelRepository } from '../LevelRepository';
import { clastersBrushes, groupsBrushes } from './brushes';
import { difference, intersection } from 'remeda';
import {
  cacheService,
  CacheService,
} from '../../../shared';

export class BrushRepository {
  constructor(
    private readonly _cacheService: CacheService,
    private readonly levelRepo: LevelRepository = levelRepository,
  ) {}

  public get clastersBrushes() {
    return clastersBrushes;
  }

  public getClastersBrushesByLevelId(levelId: string) {
    return this.getClastersBrushesByIds(
      this.levelRepo.getLevelById(levelId).allowedBrushList,
    );
  }

  public getClastersBrushesForSandbox() {
    return this.blockClastersBrushesByIds(
      ['Brush.21.Up', 'Brush.22']
    );
  }

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

  public getClastersBrushesByIds = (ids: string[] = []) => {
    if (ids.length === 0) return this.clastersBrushes;
    let whiteList = {};
    const filteredClasters = Object.entries(clastersBrushes);
    filteredClasters.forEach(([key, value]) => {
      const keyWhiteList = intersection(ids, value.values);
      if (keyWhiteList.length > 0) {
        whiteList = { ...whiteList, [key]: { ...value, values: keyWhiteList } };
      }
    });

    return whiteList;
  };

  public blockClastersBrushesByIds = (ids: string[] = []) => {
    if (ids.length === 0) return this.clastersBrushes;
    let whiteList = {};
    const filteredClasters = Object.entries(clastersBrushes);
    filteredClasters.forEach(([key, value]) => {
      const keyWhiteList = difference(value.values, ids);
      if (keyWhiteList.length > 0) {
        whiteList = { ...whiteList, [key]: { ...value, values: keyWhiteList } };
      }
    });

    return whiteList;
  };
}

export const brushRepository = new BrushRepository(cacheService);
