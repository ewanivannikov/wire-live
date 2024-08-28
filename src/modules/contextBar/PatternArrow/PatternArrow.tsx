import { For, Show } from "solid-js"
import { Popover, SegmentedControl, Tag } from "../../../shared"
import { createBrush } from "../presenter";
import { tools } from "../../toolbar";
import { patternArrow } from "./viewModel";

export const PatternArrow = () => {
  const state = createBrush(tools);

  return (
  <Show when={state.currentBrush.includes('Brush.21')}>
    <SegmentedControl aria-orientation="horizontal">
      <SegmentedControl.Button
        value={1}
        aria-label="1"
        aria-pressed={patternArrow.initialValue === 1}
        onClick={() => {patternArrow.updateInitialValue(1)}}
      >
        1
      </SegmentedControl.Button>
      <SegmentedControl.Button
        value={0}
        aria-label="0"
        aria-pressed={patternArrow.initialValue === 0}
        onClick={() => {patternArrow.updateInitialValue(0)}}
      >
        0
      </SegmentedControl.Button>
    </SegmentedControl>
    Initial value
    <label style={{ display: 'flex' }}>
      <input
        type="checkbox"
        onChange={(e) => {patternArrow.updateHasCycle(e.target.checked)}}
      />
      <span>Cycle</span>
    </label>
    <Popover.Target popovertarget="signal-pattern">
      {patternArrow.pattern.join('')}
    </Popover.Target>
    <Popover id="signal-pattern">
      <For each={patternArrow.pattern}>
        {(element) => (
          <Tag>{element}</Tag>
        )}
      </For>
    </Popover>
  </Show>
  )
}
