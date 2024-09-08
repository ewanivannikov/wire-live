import { For, Show } from 'solid-js';
import {
  DismissibleTag,
  Listbox,
  Popover,
  Tags,
  TextInput,
  TextInputTag,
} from '../../../shared';
import { createBrush } from '../presenter';
import { tools } from '../../toolbar';
import { outputArrowModel } from './viewModel';
export const OutputArrow = () => {
  const state = createBrush(tools);
  const handleClick = (el) => {
    
  }

  return (
    <Show when={state.currentBrush.includes('Brush.22')}>
      <label style={{ display: 'flex' }}>
        <input
          type="checkbox"
          onInput={(e) => {
            outputArrowModel.setHasCycle(e.target.checked);
          }}
        />
        <span>Cycle</span>
      </label>
      <Popover.Target popovertarget="output-signal-pattern">
        {outputArrowModel.pattern.join('')}
      </Popover.Target>
      <Popover id="output-signal-pattern">
        <Tags>
          <For each={outputArrowModel.pattern}>
            {(element, index) => (
              <DismissibleTag
                onClose={() => {
                  outputArrowModel.removePatternElement(index());
                }}
              >
                {element}
              </DismissibleTag>
            )}
          </For>
          <TextInputTag
            onChange={(value) => {
              if (!value) return;
              outputArrowModel.addPatternElement(value);
            }}
            size={1}
            placeholder="New"
            restrictCharacters="^[1-9]\d*$"
          />
        </Tags>
      </Popover>
      <label style={{ display: 'flex' }}>Waiting</label>
      <Popover.Target popovertarget="output-signal-wait">
        {outputArrowModel.waitingOperator}
      </Popover.Target>
      <Popover id="output-signal-wait">
        <Listbox
            aria-activedescendant={outputArrowModel.waitingOperator}
            onFocusChange={handleClick}
          >
            <For each={['=', '<', '>']}>
              {(val) => (
                <Listbox.Option id={val}>
                  {val}
                </Listbox.Option>
              )}
            </For>
          </Listbox>
      </Popover>
      <TextInput onChange={(outputArrowModel.setWaitingValue)} size={2} />
    </Show>
  );
};
