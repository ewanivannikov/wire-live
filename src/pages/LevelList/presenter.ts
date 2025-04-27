import { makeAutoObservable } from 'mobx';
import { levelRepository, LevelRepository } from '../../data';

export class LevelListPres {
  constructor(
    private readonly levelRepository: LevelRepository,
  ) {
    makeAutoObservable(this);
  }

  public get state() {
    const state= this.query.state;
    
    return state
  }

  public get list() {
    return Object.values(this.query.state.data)
  }

  public refetch = () => {
    return this.query.refetch()
  }

  private get query() {
    return this.levelRepository.getLevelList();
  }
}

export const createLevelList = () => new LevelListPres(levelRepository);

