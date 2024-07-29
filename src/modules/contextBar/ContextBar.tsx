import {
  NavigationMenu,
  Popover,
  SegmentedControl,
  navigationMenu,
  trigger,
} from '../../shared';
import { For, Show } from 'solid-js';
import { groupsBrushes } from '../brushes';
import { createBrush } from './presenter';
import { ArrowUp, ArrowDown, ArrowRight, ArrowLeft } from 'lucide-solid';
import { iconsMapping } from '../brushes/IconArrow';
import { tools } from '../toolbar/presenter';
import { Dynamic } from 'solid-js/web';

export const ContextBar = () => {
  const state = createBrush(tools);
  const handleClick = (e) => {
    state.setCurrentBrush(e.target.name);
  };

  return (
    <Show when={state.allowBrushes}>
      <Popover>
        <Popover.Trigger class="popover__trigger">
          <Dynamic component={iconsMapping[state.currentBrush]} />
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content class="popover__content">
            <Popover.Arrow />
            <Popover.Description class="popover__description">
              <NavigationMenu class={navigationMenu} orientation="vertical">
                <NavigationMenu.Menu>
                  <For each={Object.entries(groupsBrushes)}>
                    {([key, val]) => (
                      <NavigationMenu.Trigger
                        name={key}
                        class={trigger}
                        onClick={handleClick}
                      >
                        <Dynamic component={iconsMapping[key]} />
                        {val.label}
                      </NavigationMenu.Trigger>
                    )}
                  </For>
                </NavigationMenu.Menu>
              </NavigationMenu>
            </Popover.Description>
          </Popover.Content>
        </Popover.Portal>
      </Popover>
      <Show when={state.hasDirection}>
        <SegmentedControl aria-orientation="horizontal">
          <SegmentedControl.Button
            value="Up"
            aria-label="Вверх"
            onClick={(e) => state.setBrushDirection(e.target.value)}
          >
            <ArrowUp />
          </SegmentedControl.Button>
          <SegmentedControl.Button
            value="Down"
            aria-label="Вниз"
            onClick={(e) => state.setBrushDirection(e.target.value)}
          >
            <ArrowDown />
          </SegmentedControl.Button>
          <SegmentedControl.Button
            value="Left"
            aria-label="Влево"
            onClick={(e) => state.setBrushDirection(e.target.value)}
          >
            <ArrowLeft />
          </SegmentedControl.Button>
          <SegmentedControl.Button
            value="Right"
            aria-label="Вправо"
            onClick={(e) => state.setBrushDirection(e.target.value)}
          >
            <ArrowRight />
          </SegmentedControl.Button>
        </SegmentedControl>
      </Show>
    </Show>
  );
};
