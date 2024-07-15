import { NavigationMenu, navigationMenu, trigger } from '../../shared';
import { Highlighter, Eraser } from 'lucide-solid';
import { tools } from './presenter';

export const Toolbar = () => {
  const handleClick = (e) => {
    tools.setCurrentTool(e.target.name);
  };
  return (
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
  );
};
