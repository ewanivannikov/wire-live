import { NavigationMenu, navigationMenu, trigger } from '../../shared';
import { Highlighter, Eraser } from 'lucide-solid';
import { useUnit } from 'effector-solid';
import { $currentTool, setCurrentTool } from './presenter';

export const Toolbar = () => {
  const [currentTool, onSetCurrentTool] = useUnit([
    $currentTool,
    setCurrentTool,
  ]);
  const handleClick = (e) => {
    onSetCurrentTool(e.target.name);
  };
  return (
    <NavigationMenu class={navigationMenu} orientation="vertical">
      <NavigationMenu.Menu>
        <NavigationMenu.Trigger
          name="brush"
          aria-pressed={currentTool() === 'brush'}
          class={trigger}
          onClick={handleClick}
        >
          <Highlighter />
        </NavigationMenu.Trigger>
        <NavigationMenu.Trigger
          name="Eraser"
          aria-pressed={currentTool() === 'Eraser'}
          class={trigger}
          onClick={handleClick}
        >
          <Eraser />
        </NavigationMenu.Trigger>
      </NavigationMenu.Menu>
    </NavigationMenu>
  );
};
