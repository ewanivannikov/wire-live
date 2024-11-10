import { makeAutoObservable } from "mobx";
import { levelRepository, LevelRepository } from "../../../data/repositories/LevelRepository";
import { routerService, RouterService } from "../../../shared/services/RouterService";
import { fields, Fields } from "../../Logic/Base";
import { IState } from "../types";
import { createStateSolving } from "../StateSolving";
import { WorldState } from "../viewModel";

// Класс контекста, управляющий состояниями
export class LevelContext {
  public state: IState;

  constructor(
    private readonly levelRepo: LevelRepository,
    private readonly routerServ: RouterService,
    public logicField: Fields,
    private readonly root: WorldState
  ) {
    makeAutoObservable(this);
    const state = createStateSolving(this);
    this.state = state;
    this.root.state = state;
  }

  public setState = (state: IState) => {
    this.state = state;
    this.root.state = state;
  }


  public next() {
    this.state.handleNext();
  }

  public prev() {
    this.state.handlePrev();
  }

  public initRequisites() {
    const req = this.levelRepo.getRequisite(this.levelId); // случайный реквизит(пока первый)
    const patternArrowKeys = Object.keys(this.levelRepo.getPatternArrowCache(this.levelId)); // хэши паттерновых стрелок
    patternArrowKeys.forEach((key) => {
      const x = this.levelRepo.getPatternArrowCache(this.levelId)[key].x;
      const y = this.levelRepo.getPatternArrowCache(this.levelId)[key].y;
      const coord = `${x},${y}`;
      const arrow = this.logicField.getArrow(coord);
      arrow.pattern = req[key].pattern;
      arrow.cycling = req[key].hasCycle;
      arrow.active = 1 - 2 * req[key].initialValue;
      arrow.index = -1;
      arrow.loop = 0;
      if (this.levelRepo.getPatternArrowCache(this.levelId)[key].tileId.includes('22')) {
        arrow.waiting = req[key].waiting;
        arrow.isValidIn = true;
      }
      this.logicField.addArrow(coord, arrow);
      // для каждого ключа стрелки из реквизитов надо найти координату в поле стрелок пользака. Затем по координатам найти нужные инпуты и оутпуты и используя данные из реквизитов изменить их внутренние характеристики
    })
  }

  public get levelId() {
    return this.routerServ.params.levelId;
  }

  public get level() {
    return this.levelRepo.getLevelById(this.levelId);
  }

  // экспериментальный метод
  public checkSolution = this.logicField.checkSolution
}

export const createLevelContext = (root: WorldState) => new LevelContext(levelRepository, routerService, fields, root);
