import { For, Show } from 'solid-js';
import {
  DismissibleTag,
  Popover,
  SegmentedButtons,
  Tags,
  TextInput,
  TextInputTag,
} from '../../../shared';
import { inputArrowModel } from './viewModel';

export const InputArrow = (props) => {
  return (
    <Show when={props.state.currentBrush.includes('Brush.21')}>
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
      <label style={{ display: 'flex' }}>
      Initial value
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
      Label:
      <TextInput
          size={2}
          value={inputArrowModel.label}
          onChange={(e)=>{
            inputArrowModel.setLabel(e.target.value)
          }}
        />
    </Show>
  );
};
