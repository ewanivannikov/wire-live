import styles from './style.module.css';
const { root } = styles;
export const Popover = (props) => {
  return (
    <div
      class={root}
      {...props}
      classList={props.classList}
      popover
      style={{'position-anchor': `--${props.id}`}}
    />
  );
};
