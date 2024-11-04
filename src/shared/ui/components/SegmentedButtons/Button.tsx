import { ButtonBase } from '../Button/ButtonBase';
import styles from './style.module.css';

const { button } = styles;

export const Button = (props) => {
  
  return (
    <ButtonBase
      {...props}
      classList={{ [button]: true, ...props.classList }}
    />
  );
};
