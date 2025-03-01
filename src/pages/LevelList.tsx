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
import coverOrOrOr from '../assets/cover-or-or-or.webp';
import coverAndAndAnd from '../assets/cover-and-and-and.webp';
import coverPermutations from '../assets/cover-permutations.webp';
import coverCableTwisting from '../assets/cover-cable-twisting.webp';
import coverLogicalRevolution from '../assets/cover-logical-revolution.webp';
import coverExclusionRoomII from '../assets/cover-exclusion-roomII.webp'
import coverDecoder from '../assets/cover-decoder.webp'
import coverEncoder from '../assets/cover-encoder.webp'
import coverSumOfUnits from '../assets/cover-sum-of-units.webp'

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
  OrOrOr: coverOrOrOr,
  BrokenPass: coverBrokenPass,
  AndAndAnd: coverAndAndAnd,
  DifficultVoting: coverAndAndAnd,
  FillTheGaps: coverAndAndAnd,
  TemporaryNetworkShutdown: coverAndAndAnd,
  ExclusionRoom: coverAndAndAnd,
  Permutations: coverPermutations,
  Backwards: coverOneWhole,
  CableTwisting: coverCableTwisting,
  LogicalRevolution:coverLogicalRevolution,
  ExclusionRoomII: coverExclusionRoomII,
  Decoder: coverDecoder,
  Encoder: coverEncoder,
  SumOfUnits: coverSumOfUnits,
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
