import styles from './style.module.css';

const { root } = styles;

export const SegmentedControl = (props) => {
  return (
    <div
      aria-orientation="vertical"
      class={root}
      {...props}
      classList={props.classList}
      role="radiogroup"
    />
  );
};
