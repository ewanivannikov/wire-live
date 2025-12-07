import { makeAutoObservable } from 'mobx';
import { levelRepository, LevelRepository } from '../../data';

export class LevelListPres {
  constructor(
    private readonly levelRepository: LevelRepository,
  ) {
    makeAutoObservable(this);
  }

  public get status() {
    const state= this.query.status;
    
    return state
  }

  public get error() {
    return this.query.error
  }

  public get list() {
    return Object.values(this.query.data)
  }

  private get query() {
    const levelList = this.levelRepository.getLevelList();
    levelList.execute()
    return levelList;
  }
}

export const createLevelList = () => new LevelListPres(levelRepository);

