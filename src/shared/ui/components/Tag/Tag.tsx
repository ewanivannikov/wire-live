import { Dynamic } from "solid-js/web";
import styles from './style.module.css';
const { root } = styles;

export const Tag = (props) => <Dynamic 
component={"span"}
class={root}
>
  {props.children}
  </Dynamic>;
