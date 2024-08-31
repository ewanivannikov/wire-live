import { ButtonBase } from '../Button/ButtonBase';
import styles from './style.module.css';

const { button } = styles;

export const Button = (props) => {
  
  return (
    <ButtonBase
      tabindex={props['aria-pressed'] ? 0 : -1}
      aria-pressed="false"
      {...props}
      classList={{ [button]: true, ...props.classList }}
    />
  );
};
