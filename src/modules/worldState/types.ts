export type Status = 'level.play.solving' | 'level.play.checking.one';
// Интерфейс для всех состояний
export interface IState {
  status: Status;
  handleNext(): void;
}
