import {
  NavigationMenu,
  Popover,
  ToggleGroup,
  navigationMenu,
  trigger,
} from '../../shared';
import { useUnit } from 'effector-solid';
import { For, Show, Switch, Match } from 'solid-js';
import { brushIcons, brushes, groupsBrushes } from '../brushes';
import {
  $allowBrushes,
  $currentBrush,
  $currentBrushDirection,
  $hasDirection,
  setBrushDirection,
  setCurrentBrush,
} from './presenter';
import { ArrowUp, ArrowDown, ArrowRight, ArrowLeft } from 'lucide-solid';
import {
  IconArrowDown,
  IconArrowLeft,
  IconArrowRight,
  IconArrowUp,
  IconSourceBlock,
} from '../brushes/IconArrow';

export const ContextBar = () => {
  const [currentBrush, currentBrushDirection, hasDirection, allowBrushes] =
    useUnit([
      $currentBrush,
      $currentBrushDirection,
      $hasDirection,
      $allowBrushes,
    ]);
  const on = useUnit({ setCurrentBrush, setBrushDirection });
  const handleClick = (e) => {
    on.setCurrentBrush(e.target.name);
  };
  const handleChange = (value) => {
    on.setBrushDirection(value);
  };
  return (
    <Show when={allowBrushes()}>
      <Popover>
        <Popover.Trigger class="popover__trigger">
          <Switch>
            <Match when={currentBrush() === '1.up'}>
              <IconArrowUp />
            </Match>
            <Match when={currentBrush() === '1.left'}>
              <IconArrowLeft />
            </Match>
            <Match when={currentBrush() === '1.down'}>
              <IconArrowDown />
            </Match>
            <Match when={currentBrush() === '1.right'}>
              <IconArrowRight />
            </Match>
            <Match when={currentBrush() === '2'}>
              <IconSourceBlock />
            </Match>
          </Switch>
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
                        {brushIcons[key]}
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
      {' | '}
      <Show when={hasDirection()}>
        <ToggleGroup
          class="toggle-group"
          value={currentBrushDirection()}
          onChange={handleChange}
        >
          <ToggleGroup.Item
            class="toggle-group__item"
            value="up"
            aria-label="Bold"
          >
            <ArrowUp />
          </ToggleGroup.Item>
          <ToggleGroup.Item
            class="toggle-group__item"
            value="down"
            aria-label="Italic"
          >
            <ArrowDown />
          </ToggleGroup.Item>
          <ToggleGroup.Item
            class="toggle-group__item"
            value="left"
            aria-label="Underline"
          >
            <ArrowLeft />
          </ToggleGroup.Item>
          <ToggleGroup.Item
            class="toggle-group__item"
            value="right"
            aria-label="Underline"
          >
            <ArrowRight />
          </ToggleGroup.Item>
        </ToggleGroup>
      </Show>
    </Show>
  );
};
