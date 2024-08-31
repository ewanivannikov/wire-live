import { JSXElement } from 'solid-js';
import styles from './style.module.css';
const { root } = styles;

export type TagsProps = {
  children: JSXElement;
};

export const Tags = (props: TagsProps) => <ul {...props} class={root} />;
