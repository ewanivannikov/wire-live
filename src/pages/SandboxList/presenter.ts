import { makeAutoObservable } from 'mobx';
import { SandboxRepository, sandboxRepository } from '../../data/repositories/SandboxRepository';

export class SandboxListPres {
  constructor(
    private readonly sandboxRepository: SandboxRepository,
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
    return this.sandboxRepository.getSandboxList();
  }
}

export const createSandboxList = () => new SandboxListPres(sandboxRepository);

