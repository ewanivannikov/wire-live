import { ArrowBase } from '../../../modules/Logic/ArrowBase';
import { arrowToIndexTile } from '../../../modules/Logic/constants';
import { cacheService } from '../../../shared';
import { sandboxSources } from '../../sources/sandbox/sandboxSources';

export class SandboxRepository {
  constructor(
      private readonly _cacheService: CacheService,
    ) {}

  public getSandboxById(id = 'Sketch') {
    const result = this._cacheService.createQuery({
      queryKey: ['sandbox', id],

      queryFn: async () => {
        const result = await sandboxSources.getSandboxById(id);
        return result;
      },
    });

    return result;
  }

  public getUserMap(id = 'Sketch', map: Map<string, ArrowBase>) {
    for (let i = 0; i < this.getSandboxById(id).length; i++) {
      map.delete(`${i.x},${i.y}`)
    }

    const userMap = this.createMap(map);
    return userMap;
  }

  public getSandboxList = () => {
      const result = this._cacheService.createQuery({
        queryKey: ['sandboxList'],

        queryFn: async () => {
          const result = await sandboxSources.getSandboxes();
          return result;
        },
      });
  
      return result;
    }

  public createMap(tileData: Map<string, ArrowBase>) {
    const array = Array.from(tileData, ([name, value]) => {
      const [x, y] = name.split(',').map(Number);
      const tileId = [
        'Brush',
        arrowToIndexTile[value.name],
        ...value.direction ? [value.direction] : [],
        ...value.flip ? [value.flip] : [],
      ].join('.');
      return { tileId, x, y, ...value.label ? { label: value.label } : {} };
    });
    return array
  }
}

export const sandboxRepository = new SandboxRepository(cacheService);
