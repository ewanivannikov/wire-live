import { For } from 'solid-js';
import { levelRepository } from '../data';
import { Card } from '../shared/ui/components/Card';
import { Button } from '../shared/ui/components/Button';

export const LevelList = () => {
  return (
    <div class="level-list-grid">
      <For each={levelRepository.getLevelList()}>
        {(val) => (
          <Card
            imageSrc="https://placehold.co/284x200"
            title={val.name}
            href={`#/levels/${val.slug}`}
          >
            <Button component="a" href={`#/levels/${val.slug}`}>
              Добавить решение
            </Button>
            {/* <Button component="a" href={`#/levels/${val.slug}`}>
              Открыть решение
            </Button> */}
          </Card>
        )}
      </For>
    </div>
  );
};
