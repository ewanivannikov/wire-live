import { levelRepository } from "../../data";

class TaskPanel {
  constructor(private readonly levelRepo: LevelRepository) { }

  public get title() {
    return this.levelRepo.getMapById().name
  }

  public get description() {
    return this.levelRepo.getMapById().description
  }
}

export const taskPanelPresenter = new TaskPanel(levelRepository);
