import styles from './buttonBase.module.css';
import { JSX, splitProps } from 'solid-js';
import { useRipple } from './useRipple';
import { Dynamic } from 'solid-js/web';
const { root } = styles;

export type ButtonBaseProps = {
  onClick: () => void;
  component?: 'button' | 'a' | JSX.Element;
  style?: object;
} & JSX.ButtonHTMLAttributes<HTMLButtonElement>;

export const ButtonBase = (props: ButtonBaseProps) => {
  const [{ component = 'button' }, others] = splitProps(props, ['component']);
  const { onClick, position, tick } = useRipple();
  const handleClick = (e) => {
    onClick(e);
    props.onClick?.(e);
  };

  return (
    <Dynamic
      component={component}
      {...others}
      tabIndex={props['aria-pressed'] ? 0 : -1}
      aria-pressed={props['aria-pressed'] || null}
      aria-disabled={props['aria-disabled'] || null}
      classList={{ [root]: true, ...props.classList }}
      style={{
        '--ripple-x': position().x,
        '--ripple-y': position().y,
        '--animation-tick': tick(),
        ...props.style,
      }}
      type="button"
      onClick={handleClick}
    />
  );
};
