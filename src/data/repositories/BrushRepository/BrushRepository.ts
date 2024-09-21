import { LevelRepository, levelRepository } from "../LevelRepository";
import { brushes, clastersBrushes, groupsBrushes } from "./brushes";
import { intersection } from "remeda";

export class BrushRepository {
    constructor(
        private readonly levelRepo: LevelRepository = levelRepository
    ) {
        
    }

    public get clastersBrushes() {
        return clastersBrushes
    }

    public getClastersBrushesByLevelId(levelId: string) {
        return this.getClastersBrushesByIds(this.levelRepo.getLevelById(levelId).allowedBrushList)
    }


    public get groupsBrushes() {
        return groupsBrushes
    }

    public get brushList() {
        return brushes
    }

    public getClastersBrushesByIds = (ids: string[] = []) => {
        if (ids.length === 0) return this.clastersBrushes
        let whiteList = {}
        const filteredClasters = Object.entries(clastersBrushes)
        filteredClasters.forEach(([key, value]) => {
            const keyWhiteList = intersection(ids, value.values)
            if (keyWhiteList.length > 0) {
                whiteList = { ...whiteList, [key]: { ...value, values: keyWhiteList } }
            }
        })
        console.log(whiteList);
        
        return whiteList
    }
}

export const brushRepository = new BrushRepository()