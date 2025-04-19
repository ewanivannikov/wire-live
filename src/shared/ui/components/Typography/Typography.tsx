import { Dynamic } from 'solid-js/web';
import styles from './style.module.css';
import { splitProps } from 'solid-js';
const { display } = styles;
export const Typography = (props) => {
  const [{ component = 'h1', size='4rem' }, other] = splitProps(props, ['component', 'size']);
  return (
    <Dynamic 
      component={component} 
      class={`${display} ${props.class}`}
      style={{fontSize: size}}
    >
      {other.children}
    </Dynamic>
  );
};
