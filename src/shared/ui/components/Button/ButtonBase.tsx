import styles from './buttonBase.module.css';
import { useRipple } from './useRipple';
const { root } = styles;

export const ButtonBase = (props) => {
  const { onClick, position, tick } = useRipple();
  const handleClick = (e) => {
    onClick(e);
    props.onClick(e);
  };
  return <button 
    {...props}
    classList={{root, ...props.classList}}
    style={{
          '--ripple-x': position().x,
          '--ripple-y': position().y,
          '--animation-tick': tick(),
        }}
    type="button"
    onClick={handleClick}
  />;
};
