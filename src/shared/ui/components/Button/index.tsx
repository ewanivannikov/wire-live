import { Button as KButton } from '@kobalte/core/button';
import { button } from './button.module.css';

export const Button = (props) => {
  return <KButton {...props} class={button} />;
};
