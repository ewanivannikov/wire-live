import { Button as KButton } from '@kobalte/core/button';
import styles from './button.module.css';
const { button } = styles;

export const Button = (props) => {
  return <KButton {...props} class={button} />;
};