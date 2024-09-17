import { levelRepository } from "../../data";
import { marked } from 'marked';

class TaskPanel {
  constructor(private readonly levelRepo: LevelRepository) { }

  public get title() {
    return this.levelRepo.getMapById().name
  }

  public get description() {
    return marked.parse(this.levelRepo.getMapById().description)
  }
}

export const taskPanelPresenter = new TaskPanel(levelRepository);
