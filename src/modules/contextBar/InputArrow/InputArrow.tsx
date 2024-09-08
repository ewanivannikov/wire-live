import { For, Show } from 'solid-js';
import {
  DismissibleTag,
  Popover,
  SegmentedButtons,
  Tags,
  TextInputTag,
} from '../../../shared';
import { createBrush } from '../presenter';
import { tools } from '../../toolbar';
import { inputArrowModel } from './viewModel';

export const InputArrow = () => {
  const state = createBrush(tools);

  return (
    <Show when={state.currentBrush.includes('Brush.21')}>
      <SegmentedButtons aria-orientation="horizontal">
        <SegmentedButtons.Button
          value={1}
          aria-label="1"
          aria-pressed={inputArrowModel.initialValue === 1}
          onClick={() => {
            inputArrowModel.setInitialValue(1);
          }}
        >
          1
        </SegmentedButtons.Button>
        <SegmentedButtons.Button
          value={0}
          aria-label="0"
          aria-pressed={inputArrowModel.initialValue === 0}
          onClick={() => {
            inputArrowModel.setInitialValue(0);
          }}
        >
          0
        </SegmentedButtons.Button>
      </SegmentedButtons>
      Initial value
      <label style={{ display: 'flex' }}>
        <input
          type="checkbox"
          onInput={(e) => {
            inputArrowModel.setHasCycle(e.target.checked);
          }}
        />
        <span>Cycle</span>
      </label>
      <Popover.Target popovertarget="signal-pattern">
        {inputArrowModel.pattern.join('')}
      </Popover.Target>
      <Popover id="signal-pattern">
        <Tags>
          <For each={inputArrowModel.pattern}>
            {(element, index) => (
              <DismissibleTag
                onClose={() => {
                  inputArrowModel.removePatternElement(index());
                }}
              >
                {element}
              </DismissibleTag>
            )}
          </For>
          <TextInputTag
            onChange={(value) => {
              if (!value) return;
              inputArrowModel.addPatternElement(value);
            }}
            size={1}
            placeholder="New"
            restrictCharacters="^[1-9]\d*$"
          />
        </Tags>
      </Popover>
    </Show>
  );
};
