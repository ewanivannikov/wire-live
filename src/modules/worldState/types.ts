export type Status =
  | 'level.play.solving'
  | 'level.play.checking.one'
  | 'level.checking.bulk'
  | 'level.completed'
  | 'editor';
// Интерфейс для всех состояний
export interface IState {
  status: Status;
  handleNext(): void;
}
