import { createEffect, For } from 'solid-js';
import { levelRepository } from '../data';
import { Card } from '../shared/ui/components/Card';
import { Button } from '../shared/ui/components/Button';
import { LinkRouter } from '../shared/ui/components/LinkRouter';

export const LevelList = () => {
//   createEffect(()=>{
// console.log('🚩🚩🚩🚩',new URL('../../assets/cover-adder.png', import.meta.url));

//   }, null)
  return (
    <div class="level-list-grid">
      <For each={levelRepository.getLevelList()}>
        {(val) => (
          <Card
            imageSrc={val.cover}
            title={val.name}
            to={`/levels/${val.slug}`}
          >
            <Button component={LinkRouter} to={`/levels/${val.slug}`}>
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
