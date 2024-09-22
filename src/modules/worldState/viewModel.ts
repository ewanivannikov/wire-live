import { makeAutoObservable } from "mobx";
import { type RouterService, routerService } from "../../shared/services";
import { fields, type Fields } from "../Logic/Base";
import { Loop } from "../mapContainer/systems";
import { LevelRepository, levelRepository } from "../../data";

export class WorldState {
    tick = this.initTick();
    constructor(private readonly routerServ: RouterService, private readonly logicField: Fields, private readonly levelRepo: LevelRepository) {
        makeAutoObservable(this);
     }

    private initTick() {
        if (this.status === 'level.play.solving'){
            this.logicField.paused = true;
            return 0
        } else {
            this.logicField.paused = false;
            return 500
        }
    }

    public get status() {
        return 'level.play.solving';
    }

    public get levelId() {
        return this.routerServ.params.levelId;
    }

    private get level() {
        return this.levelRepo.getLevelById(this.levelId);
    }

    public togglePause(loop: Loop) {
        if (this.tick > 0) {
            this.tick = 0;
            this.logicField.updatePause();
          } else {
            this.tick = 500;
            loop.setDuration(500);
            this.logicField.updatePause();
          }
    }

    public canBeDeleted = (tile) => {
        const result = this.level.map.find((tileData) => {
            const name = [tileData.x, tileData.y].join(',');
            return name === tile.name
        })
        
        return !Boolean(result)
    }
}

export const worldState = new WorldState(routerService, fields, levelRepository);
