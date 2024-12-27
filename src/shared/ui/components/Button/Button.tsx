import { ButtonBase, type ButtonBaseProps } from './ButtonBase';
import styles from './button.module.css';
const { button, inner } = styles;

export const Button = (props: ButtonBaseProps) => {
  return (
    <ButtonBase {...props} classList={{ [button]: true, ...props.classList }}>
      <span class={inner}>{props.children}</span>
    </ButtonBase>
  );
};
