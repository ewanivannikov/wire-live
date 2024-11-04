
import { ButtonBase } from "./ButtonBase";
import styles from './button.module.css';
const { button } = styles;

export const Button = (props) => {
  return (
    <ButtonBase
      {...props}
      classList={{ [button]: true, ...props.classList }}
    >
      {props.children}
    </ButtonBase>
  );
};
