import { JSX } from 'solid-js';
import styles from './optgroup.module.css';
const { root, label } = styles;

export type OptgroupProps = {
  label: string;
} & JSX.LiHTMLAttributes<HTMLUListElement>;

export const Optgroup = (props: OptgroupProps) => {
  const { classList, ...rest } = props;
  return (
    <ul
      role="group"
      {...rest}
      classList={{ [root]: true, ...classList }}
      aria-labelledby={props.label}
    >
      <li role="presentation" id={props.label} class={label}>
        {props.label}
      </li>
      {props.children}
    </ul>
  );
};
