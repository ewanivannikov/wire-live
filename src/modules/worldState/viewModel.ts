export class WorldState {
    private static instance: WorldState | null = null;
    constructor(
        public readonly levelId: string
    ) { }

    public get status() {
        return 'level.play.solving';
    }

    public static getInstance(
        levelId?: string
      ) {
        if (!WorldState.instance) {
            WorldState.instance = new WorldState(levelId);
        }
    
        return WorldState.instance;
      }
}

export const createWorldState = (levelId?: string) => WorldState.getInstance(levelId)