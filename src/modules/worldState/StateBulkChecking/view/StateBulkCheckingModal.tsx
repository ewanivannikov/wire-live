import { Button, Modal } from "../../../../shared";
import { Histogram } from "../../../../shared/ui/components/Histogram/Histogram";

const challenges = [
  {isSolved: true, amount: 50},
  {isSolved: false, amount: 100},
  {isSolved: true, amount: 50},
]

export const StateBulkCheckingModal = (props) => {
  return (
    <Modal open>
      <h1>Имя Уровня</h1>
      <h2>Optional square challenge</h2>
      <h2>Optional speed challenge</h2>
      <Histogram bars={challenges} />
      <Button>Назад</Button>
      <Button>Дальше</Button>
    </Modal>
  );
};
