import styles from './buttonBase.module.css';
const { root } = styles;

export const ButtonBase = (props) => {
  return <button {...props} class={root} type="button" />;
};
