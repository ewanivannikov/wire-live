import { NavigationMenu, navigationMenu, trigger } from '../../shared';
import { Highlighter, Eraser } from 'lucide-solid';
import { tools } from './presenter';

export const Toolbar = () => {
  // const [currentTool, onSetCurrentTool] = useUnit([
  //   $currentTool,
  //   setCurrentTool,
  // ]);

  const handleClick = (e) => {
    tools.setCurrentTool(e.target.name);
  };
  return (
    <NavigationMenu class={navigationMenu} orientation="vertical">
      <NavigationMenu.Menu>
        <NavigationMenu.Trigger
          name="brush"
          aria-pressed={tools.currentTool === 'brush'}
          class={trigger}
          onClick={handleClick}
        >
          <Highlighter />
        </NavigationMenu.Trigger>
        <NavigationMenu.Trigger
          name="eraser"
          aria-pressed={tools.currentTool === 'eraser'}
          class={trigger}
          onClick={handleClick}
        >
          <Eraser />
        </NavigationMenu.Trigger>
      </NavigationMenu.Menu>
    </NavigationMenu>
  );
};
