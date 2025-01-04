import { LevelRepository, levelRepository } from '../../data';
import { marked } from 'marked';
import { routerService } from '../../shared/services';
import { LEVEL_MODE_STATUS_LABEL } from '../worldState/constants';
import { WorldState } from '../worldState';
import { makeAutoObservable } from 'mobx';

class TaskPanel {
  constructor(private readonly levelRepo: LevelRepository, private readonly _worldState: WorldState) {
    makeAutoObservable(this);
  }

  private get level() {
    const levelId = routerService.params.levelId;
    return this.levelRepo.getLevelById(levelId);
  }

  public get title() {
    return this.level.name;
  }

  public get description() {
    return marked.parse(this.level.description);
  }

  public get status() {
    return LEVEL_MODE_STATUS_LABEL[this._worldState.status];
  }
}

export const createTaskPanelPresenter = (worldState: WorldState) => new TaskPanel(levelRepository, worldState);
