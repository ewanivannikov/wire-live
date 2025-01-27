import { createEffect, For } from 'solid-js';
import { levelRepository } from '../data';
import { Card } from '../shared/ui/components/Card';
import { Button } from '../shared/ui/components/Button';
import { LinkRouter } from '../shared/ui/components/LinkRouter';

import sprites from '../assets/glyphs-sprites.svg';
import spritesUi from '../assets/glyphs-sprites-ui.svg';
import coverAdder from '../assets/cover-adder.webp';
import coverBriefing from '../assets/cover-briefing.webp';
import coverPlaceholder from '../assets/cover-placeholder.webp';
import coverBadTurn from '../assets/cover-bad-turn.webp';
import coverBranching from '../assets/cover-branching.webp';
import coverCrossroads from '../assets/cover-crossroads.webp';
import coverFineWork from '../assets/cover-fine-work.webp';
import coverFineWorkII from '../assets/cover-fine-work-ii.webp';
import coverCatchTheBus from '../assets/cover-catch-the-bus.webp';
import coverOneWhole from '../assets/cover-one-whole.webp';
import coverBrokenPass from '../assets/cover-broken-pass.webp';
console.log('sprites', sprites, spritesUi);

const covers = {
  Adder: coverAdder,
  Briefing: coverBriefing,
  BadTurn: coverBadTurn,
  Branching: coverBranching,
  Crossroads: coverCrossroads,
  FineWork: coverFineWork,
  FineWorkII: coverFineWorkII,
  CatchTheBus: coverCatchTheBus,
  OneWhole: coverOneWhole,
  OrOrOr: coverPlaceholder,
  BrokenPass: coverBrokenPass,
}

export const LevelList = () => {
  return (
    <div class="level-list-grid">
      <For each={levelRepository.getLevelList()}>
        {(val) => (
          <Card
            imageSrc={covers[val.slug] || coverPlaceholder}
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
