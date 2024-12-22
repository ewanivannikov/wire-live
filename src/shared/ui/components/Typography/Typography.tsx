import { Dynamic } from 'solid-js/web';
import styles from './style.module.css';
import { splitProps } from 'solid-js';
const { display } = styles;
export const Typography = (props) => {
  const [{component = 'h1'}, other] = splitProps(props, ["component"]);
  return (
    <Dynamic component={component} class={`${display} ${props.class}`}>
      {other.children}
    </Dynamic>
  );
};
