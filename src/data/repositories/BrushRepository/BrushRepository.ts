import { brushes, clastersBrushes, groupsBrushes } from "./brushes";


export class BrushRepository {
    public get clastersBrushes() {
        return clastersBrushes
    }


    public get groupsBrushes() {
        return groupsBrushes
    }

    public get brushList() {
        return brushes
    }
}

export const brushRepository = new BrushRepository()