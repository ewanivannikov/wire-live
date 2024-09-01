import styles from './buttonBase.module.css';
import { JSX } from 'solid-js';
import { useRipple } from './useRipple';
const { root } = styles;

export type ButtonBaseProps = {
  onClick: () => void;
} & JSX.ButtonHTMLAttributes<HTMLButtonElement>;

export const ButtonBase = (props: ButtonBaseProps) => {
  const { onClick, position, tick } = useRipple();
  const handleClick = (e) => {
    onClick(e);
    props.onClick?.(e);
  };
  return <button 
    {...props}
    classList={{[root]: true, ...props.classList}}
    style={{
          '--ripple-x': position().x,
          '--ripple-y': position().y,
          '--animation-tick': tick(),
        }}
    type="button"
    onClick={handleClick}
  />;
};
