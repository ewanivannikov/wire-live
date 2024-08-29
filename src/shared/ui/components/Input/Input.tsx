import styles from './style.module.css';
const { root } = styles;

export const Input = (props) => {
  return <input type="text" role="textbox" class={root} {...props}  />;
}
