import styles from './buttonBase.module.css';
import { JSX } from 'solid-js';
import { useRipple } from './useRipple';
import { Dynamic } from 'solid-js/web';
const { root } = styles;

export type ButtonBaseProps = {
  onClick: () => void;
  component?: 'button' | 'a';
  style?: object;
} & JSX.ButtonHTMLAttributes<HTMLButtonElement>;

export const ButtonBase = (props: ButtonBaseProps) => {
  const { component = 'button' } = props;
  const { onClick, position, tick } = useRipple();
  const handleClick = (e) => {
    onClick(e);
    props.onClick?.(e);
  };

  return <Dynamic component={component}
    {...props}
    classList={{[root]: true, ...props.classList}}
    style={{
          '--ripple-x': position().x,
          '--ripple-y': position().y,
          '--animation-tick': tick(),
          ...props.style
        }}
    type="button"
    onClick={handleClick}
  />;
};
