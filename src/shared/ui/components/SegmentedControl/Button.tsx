import styles from './style.module.css';
import { useRipple } from './useRipple';

const { button } = styles;

export const Button = (props) => {
  const { onClick, position, tick } = useRipple();
  const handleClick = (e) => {
    onClick(e);
    props.onClick(e);
  }
  return <button 
    type="button"
    tabindex={props['aria-pressed'] ? 0 : -1}
    aria-pressed="false"
    style={{
      '--ripple-x': position().x,
      '--ripple-y': position().y,
      '--animation-tick': tick()
    }}
    {...props}
    onClick={handleClick}
    classList={{[button]: true, ...props.classList}}
  />;
}
