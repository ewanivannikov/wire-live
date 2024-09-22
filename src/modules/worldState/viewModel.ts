import { type RouterService, routerService } from "../../shared/services";

export class WorldState {
    constructor(private readonly routerServ: RouterService) { }

    public get status() {
        return 'level.play.solving';
    }

    public get levelId() {
        return this.routerServ.params.levelId;
    }
}

export const worldState = new WorldState(routerService);
