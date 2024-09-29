import { makeAutoObservable } from "mobx";
import { type RouterService, routerService } from "../../shared/services";
import { fields, type Fields } from "../Logic/Base";
import { Loop } from "../mapContainer/systems";
import { LevelRepository, levelRepository } from "../../data";
import { Position } from "../Logic/Position";

export class WorldState {
    status = 'level.play.solving';
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

    public switchStatusOnLevelOneChecking() {
        this.status = 'level.play.checking.one';
    }

    public initRequisites() {
        const req = this.levelRepo.getRequisite(this.levelId);
        const patternArrowKeys = Object.keys(this.levelRepo.getPatternArrowCache(this.levelId))
        patternArrowKeys.forEach((key) => {
            // для каждого ключа стрелки из реквизитов надо найти координату в поле стрелок пользака. Затем по координатам найти нужные инпуты и оутпуты и используя данные из реквизитов изменить их внутренние характеристики
        })
    }

    public switchStatusOnLevelSolving() {
        this.status = 'level.play.solving';
        this.logicField.clearStates();
        this.logicField.clearSignals();
        this.logicField.clearArrowsStates();
    }

    public switchOnSend() {
        this.switchStatusOnLevelOneChecking();
        this.logicField.paused = false;
        this.tick = 500;
    }

    public switchOnSolve() {
        this.switchStatusOnLevelSolving();
        this.logicField.paused = true;
        this.tick = 0;
    }

    public get levelId() {
        return this.routerServ.params.levelId;
    }

    public get level() {
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
