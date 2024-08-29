import { Dynamic } from "solid-js/web";
import styles from './style.module.css';
import { JSXElement } from "solid-js";
const { root } = styles;

export type TagProps = {
  children: JSXElement
}

export const Tag = (props: TagProps) => <Dynamic 
component={"span"}
class={root}
{...props}
/>;
