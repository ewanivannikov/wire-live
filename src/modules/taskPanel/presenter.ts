import { levelRepository } from "../../data";
import { marked } from 'marked';
import { routerService } from "../../shared/services";

class TaskPanel {
  constructor(private readonly levelRepo: LevelRepository) { }

  private get level() {
    const mapId = routerService.location.hash.replace('#/levels/', '')
    return this.levelRepo.getLevelById(mapId)
  }

  public get title() {
    return this.level.name
  }

  public get description() {
    return marked.parse(this.level.description)
  }
}

export const taskPanelPresenter = new TaskPanel(levelRepository);
