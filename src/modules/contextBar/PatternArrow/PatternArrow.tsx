import { For, Show } from "solid-js"
import { DismissibleTag, Popover, SegmentedControl, Tags, TextInputTag } from "../../../shared"
import { createBrush } from "../presenter";
import { tools } from "../../toolbar";
import { patternArrowModel } from "./viewModel";

export const PatternArrow = () => {
  const state = createBrush(tools);

  return (
  <Show when={state.currentBrush.includes('Brush.21')}>
    <SegmentedControl aria-orientation="horizontal">
      <SegmentedControl.Button
        value={1}
        aria-label="1"
        aria-pressed={patternArrowModel.initialValue === 1}
        onClick={() => {patternArrowModel.setInitialValue(1)}}
      >
        1
      </SegmentedControl.Button>
      <SegmentedControl.Button
        value={0}
        aria-label="0"
        aria-pressed={patternArrowModel.initialValue === 0}
        onClick={() => {patternArrowModel.setInitialValue(0)}}
      >
        0
      </SegmentedControl.Button>
    </SegmentedControl>
    Initial value
    <label style={{ display: 'flex' }}>
      <input
        type="checkbox"
        onInput={(e) => {
          patternArrowModel.setHasCycle(e.target.checked)
        }}
      />
      <span>Cycle</span>
    </label>
    <Popover.Target popovertarget="signal-pattern">
      {patternArrowModel.pattern.join('')}
    </Popover.Target>
    <Popover id="signal-pattern">
      <Tags>
        <For each={patternArrowModel.pattern}>
          {(element, index) => (
            <DismissibleTag 
              onClose={() => {patternArrowModel.removePatternElement(index())}}>
              {element}
            </DismissibleTag>
          )}
        </For>
        <TextInputTag 
          onChange={(value) => {
            if(!value) return
            patternArrowModel.addPatternElement(value)
          }}
          size={1}
          placeholder="New"
          restrictCharacters="^[1-9]\d*$"
        />
      </Tags>
    </Popover>
  </Show>
  )
}
