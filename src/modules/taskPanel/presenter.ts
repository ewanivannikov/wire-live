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
    const level = this.levelRepo.getLevelById2(levelId)
    level.execute()
    return level.data;
  }

  public get title() {
    if (this.level) {
      return this.level.name;
    }
    return '';
  }

  public get description() {
    if (this.level && this.level.description) {
      return marked.parse(this.level.description);
    }
    return '';
  }

  public get status() {
    return LEVEL_MODE_STATUS_LABEL[this._worldState.status];
  }
}

export const createTaskPanelPresenter = (worldState: WorldState) => new TaskPanel(levelRepository, worldState);
