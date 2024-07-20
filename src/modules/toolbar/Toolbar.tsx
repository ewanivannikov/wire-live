import { NavigationMenu, navigationMenu, trigger, Button } from '../../shared';
import { Highlighter, Eraser, Play, Pause } from 'lucide-solid';
import { tools } from './presenter';
import { Match, Switch } from 'solid-js';

export const Toolbar = () => {
  const handleClick = (e) => {
    tools.setCurrentTool(e.target.name);
  };
  const handleClickTick = (e) => {
    tools.setTick();
  }
  return (
    <>
    <NavigationMenu class={navigationMenu} orientation="vertical">
      <NavigationMenu.Menu>
        <NavigationMenu.Trigger
          name="Brush"
          aria-pressed={tools.currentTool === 'Brush'}
          class={trigger}
          onClick={handleClick}
        >
          <Highlighter />
        </NavigationMenu.Trigger>
        <NavigationMenu.Trigger
          name="Eraser"
          aria-pressed={tools.currentTool === 'Eraser'}
          class={trigger}
          onClick={handleClick}
        >
          <Eraser />
        </NavigationMenu.Trigger>
      </NavigationMenu.Menu>
    </NavigationMenu>
    <hr/>
    <Button name="Play"
          aria-pressed={tools.tick === 0}
          class={trigger}
          onClick={handleClickTick} >
            <Switch>
              <Match when={tools.tick === 0}>
                <Play />
              </Match>
              <Match when={tools.tick > 0}>
                <Pause />
              </Match>
            </Switch>
      
    </Button>
    </>
  );
};
