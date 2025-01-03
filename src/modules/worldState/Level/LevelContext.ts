import { makeAutoObservable } from 'mobx';
import {
  levelRepository,
  LevelRepository,
} from '../../../data/repositories/LevelRepository';
import {
  routerService,
  RouterService,
} from '../../../shared/services/RouterService';
import { fields, Fields } from '../../Logic/Base';
import { IState } from '../types';
import { createStateSolving } from '../StateSolving';
import { WorldState } from '../viewModel';
import { createInputArrow } from '../../Logic/InputArrow';
import { createOutputArrow } from '../../Logic/OutputArrow';

// Класс контекста, управляющий состояниями
export class LevelContext {
  public state: IState;

  constructor(
    private readonly levelRepo: LevelRepository,
    private readonly routerServ: RouterService,
    public logicField: Fields,
    private readonly root: WorldState,
  ) {
    makeAutoObservable(this);
    const state = createStateSolving(this);
    this.state = state;
    this.root.state = state;
  }

  public setState = (state: IState) => {
    this.state = state;
    this.root.state = state;
  };

  public next() {
    this.state.handleNext();
  }

  public prev() {
    this.state.handlePrev();
  }

  public initRequisites(exceptions?: number[]) {
    const req = this.levelRepo.getRequisite({ id: this.levelId, exceptions }); // случайный реквизит(пока первый)
    
    if (req instanceof Error && req.cause === 'ALL_ARE_EXCEPTIONS') {
      return req;
    }
    
    const { requisite, requisiteIndex } = req;
    const patternArrowKeys = Object.keys(
      this.levelRepo.getPatternArrowCache(this.levelId),
    ); // хэши паттерновых стрелок
    patternArrowKeys.forEach((key) => {
      const x = this.levelRepo.getPatternArrowCache(this.levelId)[key].x;
      const y = this.levelRepo.getPatternArrowCache(this.levelId)[key].y;
      const coord = `${x},${y}`;
      const pattern = requisite[key].pattern;
      const cycling = requisite[key].hasCycle;
      const arraive = requisite[key].initialValue;
      if (
        this.levelRepo
          .getPatternArrowCache(this.levelId)
          [key].tileId.includes('21')
      ) {
        const direction = this.logicField.getArrow(coord).direction
        const arrow = createInputArrow(coord, direction, pattern, cycling, arraive)
        this.logicField.addArrow(coord, arrow)
      }   
      if (
        this.levelRepo
          .getPatternArrowCache(this.levelId)
          [key].tileId.includes('22')
      ) {
        const waiting = requisite[key].waiting;
        const arrow = createOutputArrow(coord, pattern, cycling, arraive, waiting)
      }
      // для каждого ключа стрелки из реквизитов надо найти координату в поле стрелок пользака. Затем по координатам найти нужные инпуты и оутпуты и используя данные из реквизитов изменить их внутренние характеристики
    });

    return requisiteIndex;
  }

  public get levelId() {
    return this.routerServ.params.levelId;
  }

  public get level() {
    return this.levelRepo.getLevelById(this.levelId);
  }

  // экспериментальный метод
  public checkSolution = this.logicField.checkSolution;
}

export const createLevelContext = (root: WorldState) =>
  new LevelContext(levelRepository, routerService, fields, root);
