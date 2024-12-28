export namespace SolutionDTO {
  export type Solution = {
    id: number;
    status: 'draft' | 'cleanCopy',
    map: object[]
  }
}
