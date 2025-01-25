export namespace LevelDTO { 
  export type Map = {
    slug: string;
    name: string;
    description: string;
    map: object[];
    allowedBrushList: string[];
    requisites: object;
    optionalChallenges: object;
  };
}
